import LinkIcon from "../../public/svg/linkIcon.svg";
export const columns = [
  {
    Header: "Partner",
    accessor: "partnerId",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Year",
    accessor: "year",
    Cell: (props) => {
      const range = [2000, 2005, 2010, 2015, 2020];
      let interval = binarySearch(range, props.value);

      return <span className={interval}>{props.value}</span>;
    },
  },
  {
    Header: "URL",
    accessor: "url",
    Cell: ({ cell }) => (
      <a href={cell.row.original.image}>
        <LinkIcon />
      </a>
    ),
  },
];

function binarySearch(arr, n) {
  let min = 0;
  let max = arr.length - 1;
  let mid;

  while (min <= max) {
    mid = Math.floor((min + max) / 2);
    if (arr[mid] === n) {
      return mid + 1;
    } else if (arr[mid] < n) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return `age--${min}`;
}
