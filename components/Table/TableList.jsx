import { Avatar } from '../Avatar';
import { Container } from '../Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx'; // clsx is generally used to conditionally apply a given className
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Table.module.css';
import { Pagination } from '../Pagination';
import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

const classes = {
  tableHead: 'text-sm font-medium text-gray-900 px-6 py-4 text-left',
  tableRow: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
  tableRowFst: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
  urlLink: 'no-underline hover:underline'
}

const TableList = ({ className, repos }) => {
  const totalRepos = repos.length;
  const pageLimit = 5;
  const [ totalPages, setTotalPages ] = useState(Math.ceil(totalRepos / pageLimit));
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ currentRepo, setCurrentRepo] = useState([]);
  useEffect(() => {
    onPageChanged(currentPage, totalPages, pageLimit, repos);
  }, []);

  const onPageChanged = () => {
    try {
      const offset = (currentPage - 1) * pageLimit; // 0
      const newCurrentRepo = repos.slice(offset, offset + pageLimit); // 0, 5
      setCurrentRepo(prev => [...prev, ...newCurrentRepo]);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (data) {
      toast.error(data.message);
    }
  };

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {/* <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className={classes.tableHead}>#</th>
                    <th scope="col" className={classes.tableHead}>Name</th>
                    <th scope="col" className={classes.tableHead}>UserName</th>
                    <th scope="col" className={classes.tableHead}>Content</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className={classes.tableRowFst}>{number}</td>
                    <td className={classes.tableRow}>
                      {comment.creator.name}
                    </td>
                    <td className={classes.tableRow}>
                      {comment.creator.username}
                    </td>
                    <td className={classes.tableRow}>
                      {comment.content}
                    </td>
                  </tr>
                </tbody>
              </table> */}
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className={classes.tableHead}>#</th>
                    <th scope="col" className={classes.tableHead}>Name</th>
                    <th scope="col" className={classes.tableHead}>Stargazers Count</th>
                    <th scope="col" className={classes.tableHead}>Language</th>
                    {/* <th scope="col" className={classes.tableHead}>URL</th> */}
                  </tr>
                </thead>
                <tbody>
                {repos.map((repo, item) => (
                  <tr className="border-b" key={item}>
                    <td className={classes.tableRowFst}>{item + 1}</td>
                    <td className={classes.tableRow}>
                      {repo.name}
                    </td>
                    <td className={classes.tableRow}>
                      {repo.stargazers_count}
                    </td>
                    <td className={classes.tableRow}>
                      {repo.language}
                    </td>
                    {/* <td className={classes.tableRow}>
                      <a href={repo.clone_url}
                      className={classes.urlLink}
                      ><span>
                        {repo.name}</span></a>
                    </td> */}
                  </tr>
                ))}
                </tbody>
              </table>
              {/* <Pagination
                totalRecords={totalRepos}
                pageLimit={5}
                pageNeighbours={1}
                repos={repos}
                onPageChanged={onPageChanged}
                // onPageChanged={onPageChanged}
              /> */}
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* <div className={styles.wrap}>
      </div> */}
    </div>
  );
};

export default TableList;
