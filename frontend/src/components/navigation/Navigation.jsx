import React, { useContext, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { authcontext } from "../AuthContext";
import styles from "./Navigation.module.css";
import { sortedAllSongs } from "../../store/Songs-store";

const Navigation = ({ isLogin }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(authcontext);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  function binarySearchFirstMatch(array, searchString) {
    console.log("first match function called ");
    let left = 0;
    let right = array.length - 1;
    console.log(right, "right is right");
    let resultIndex = 0;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      // console.log(
      //   "array[mid].songNameOfSongs.startsWith(searchString) is ",
      //   array[mid].songNameOfSongs.toLowerCase().startsWith(searchString),
      //   array[mid].songNameOfSongs
      // );

      if (array[mid].songNameOfSongs.toLowerCase().startsWith(searchString)) {
        resultIndex = mid;
        // console.log("resultindex is ", resultIndex);
        return resultIndex;
        // Continue searching on the left side for the first occurrence
      } else if (array[mid].songNameOfSongs.toLowerCase() < searchString) {
        // console.log(
        //   "array[mid].songNameOfSongs < searchString",
        //   array[mid].songNameOfSongs < searchString,
        //   " array[mid].songNameOfSongs is",
        //   array[mid].songNameOfSongs,
        //   "searchString is",
        //   searchString
        // );
        // console.log("left is ", left);
        left = mid + 1;
      } else {
        // console.log(
        //   "array[mid].songNameOfSongs > searchString",
        //   array[mid].songNameOfSongs > searchString
        // );
        // console.log("right is ", right);
        right = mid - 1;
      }
    }

    // console.log("result index is ", resultIndex);

    return resultIndex;
  }

  function findAllMatches(array, searchString) {
    // console.log("find all matches called");
    let firstMatchIndex = 0;
    firstMatchIndex = binarySearchFirstMatch(array, searchString);
    console.log("first match index is ", firstMatchIndex);
    if (firstMatchIndex === 0) return []; // No match found

    let results = [];

    // Expand to the right
    // for (let i = firstMatchIndex; i < array.length; i++) {
    //   if (array[i].songNameOfSongs.startsWith(searchString)) {
    //     results.push(array[i]);
    //   } else {
    //     break;
    //   }
    // }
    let i = firstMatchIndex + 1;
    console.log(array[i].songNameOfSongs);
    while (
      i < array.length &&
      array[i].songNameOfSongs.toLowerCase().startsWith(searchString)
    ) {
      results.push(array[i]);
      i++;
    }

    // Expand to the left
    i = firstMatchIndex;
    // for (let i = firstMatchIndex - 1; i >= 0; i--) {
    //   if (array[i].songNameOfSongs.startsWith(searchString)) {
    //     results.unshift(array[i]);
    //   } else {
    //     break;
    //   }
    // }
    while (
      i >= 0 &&
      array[i].songNameOfSongs.toLowerCase().startsWith(searchString)
    ) {
      results.push(array[i]);
      i--;
    }

    // console.log("all resultant result is ", results);

    return results;
  }
  const handleSearch = async (value) => {
    // console.log("handle search called", value);
    const sortedArray = sortedAllSongs();
    // console.log(sortedArray);
    const result = findAllMatches(sortedArray, value);

    const dynamicUrl = "/search";
    navigate(dynamicUrl, { state: { result } });
  };

  const Logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch("/api/v1/user/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
      });
      if (response.ok) {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
    return navigate("/");
  };

  return (
    <div
      className={isLogin ? styles.loginNavbarContainer : styles.navbarContainer}
    >
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <NavLink className={styles.navbarBrand} to="/">
            <FaSpotify />
          </NavLink>
          <button className={styles.toggler} onClick={toggleMenu}>
            <span className={styles.togglerIcon}></span>
          </button>

          <div className={styles.navbarCollapse}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} to="/">
                  Home
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/about" className={styles.navLink}>
                  About
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <div className={styles.dropdown}>
                  <a
                    className={styles.navLink}
                    href="#"
                    onClick={toggleDropdown}
                  >
                    Your Library
                  </a>
                  <div className={styles.dropdownMenu}>
                    <NavLink
                      to="/user-playlist"
                      className={styles.dropdownItem}
                    >
                      Your Playlist
                    </NavLink>
                    <NavLink
                      to="/create-playlist"
                      className={styles.dropdownItem}
                    >
                      Create New Playlist
                    </NavLink>
                    <hr className={styles.dropdownDivider} />
                    <a className={styles.dropdownItem} href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </li>
              {isAuthenticated ? (
                <li className={styles.navItem}>
                  <NavLink className={styles.navLink} onClick={Logout}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <li className={styles.navItem}>
                  <NavLink className={styles.navLink} to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
            <form className={styles.searchForm}>
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                  setSearchValue(e.target.value);
                  handleSearch(e.target.value);
                }}
                value={searchValue}
                className={styles.searchInput}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className={styles.searchButton} type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );

  function toggleMenu() {
    const collapse = document.querySelector(`.${styles.navbarCollapse}`);
    collapse.classList.toggle(styles.show);
  }

  function toggleDropdown() {
    const dropdown = document.querySelector(`.${styles.dropdownMenu}`);
    dropdown.classList.toggle(styles.show);
  }
};

export default Navigation;
