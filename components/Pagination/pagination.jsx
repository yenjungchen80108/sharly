import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './pagination.module.scss';
import toast from 'react-hot-toast';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

const Pagination = ({totalRecords, pageLimit, pageNeighbours, repos, onPageChanged}) => {
  const [ totalRec, setTotalRecords ] = useState(0);
  // const [ totalRec, setTotalRecords ] = useState(typeof totalRecords === 'number' ? totalRecords : 0);
  const [ pageLim, setPageLimit ] = useState(30);
  // const [ pageLim, setPageLimit ] = useState(typeof pageLimit === 'number' ? pageLimit : 30);
  const [ pageNeigh , setPageNeighbours ] = useState(0);
  // const [ pageNeigh , setPageNeighbours ] = useState(typeof pageNeighbours === 'number' ? Math.max(0, Math.min(pageNeighbours, 2)) : 0);
  const [ totalPages, setTotalPages ] = useState(Math.ceil(totalRecords / pageLimit));
  const [ currentPage, setCurrentPage ] = useState(1);
  // const [ currentRepo, setCurrentRepo ] = useState([]);
  const [currentRepo, setCurrentRepo] = useState([]);
  const pages = fetchPageNumbers();
  // console.log('onPageChanged',onPageChanged);
  
  // console.log('pages', typeof repos);
  useEffect(() => {
    // console.log('pages',pages);
    setTotalRecords(typeof totalRecords === 'number' ? totalRecords : 0);
    setPageLimit(typeof pageLimit === 'number' ? pageLimit : 30);
    setPageNeighbours(typeof pageNeighbours === 'number' ? Math.max(0, Math.min(pageNeighbours, 2)) : 0);
    // setCurrentRepo(prevState => ({ list: [...prevState.list, ...currentRepo]}));
    // setCurrentRepo(prev => [...prev, currentRepo]);
    if (!totalRec) return null;
    gotoPage(1);
  }, []);

  const gotoPage = page => {
    // const { onPageChanged = f => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, totalPages));
    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      repos
    };
    onPageChanged(paginationData);
  }

  // const onPageChanged = useCallback(async (data) => {
  //   data.preventDefault();
  //   try {
  //     const { currentPage, totalPages, pageLim, repos } = data;
  //     const offset = (currentPage - 1) * pageLim; // 0
  //     const newCurrentRepo = repos.slice(offset, offset + pageLim); // 0, 5
  //     setCurrentRepo(prev => [...prev, newCurrentRepo]);
  //     setCurrentPage(currentPage);
  //     setTotalPages(totalPages);
  //   } catch (data) {
  //     toast.error(data.message);
  //   }
  // }, []);

  const handleClick = page => e => {
    e.preventDefault();
    gotoPage(page);
  }

  const handleMoveLeft = e => {
    e.preventDefault();
    gotoPage(currentPage - (pageNeigh * 2) - 1);
  }

  const handleMoveRight = e => {
    e.preventDefault();
    gotoPage(currentPage + (pageNeigh * 2) + 1);
  }
  /**
 * Let's say we have 10 pages and we set pageNeighbours to 2
 * Given that the current page is 6
 * The pagination control will look like the following:
 *
 * (1) < {4 5} [6] {7 8} > (10)
 *
 * (x) => terminal pages: first and last page(always visible)
 * [x] => represents current page
 * {...x} => represents page neighbours
 */
  function fetchPageNumbers() {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeigh * 2) + 3;
    const totalBlocks = totalNumbers + 2;
    // console.log('totalNumbers',totalNumbers);
    // console.log('totalBlocks',totalBlocks);

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeigh);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeigh);
      let pages = range(startPage, endPage);
      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  }
  
  return (
    <Fragment>
      <nav>
        <ul className={styles.pagination}>
          { pages.map((page, index) => {

            if (page === LEFT_PAGE) return (
              <li key={index} className={styles.pageItem}>
                <a className={styles.pageLink} href="#" aria-label="Previous" onClick={handleMoveLeft}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
            );

            if (page === RIGHT_PAGE) return (
              <li key={index} className={styles.pageItem}>
                <a className={styles.pageLink} href="#" aria-label="Next" onClick={handleMoveRight}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            );

            return (
              <li key={index} className={`${styles.pageItem}${ currentPage === page ? ' active' : ''}`}>
                <a className={styles.pageLink} href="#" onClick={handleClick(page) }>{ page }</a>
              </li>
            );

          }) }

        </ul>
      </nav>
    </Fragment>
  );
}

// Pagination.propTypes = {
//   totalRecords: PropTypes.number.isRequired,
//   pageLimit: PropTypes.number,
//   pageNeighbours: PropTypes.number,
//   onPageChanged: PropTypes.func
// };

export default Pagination;