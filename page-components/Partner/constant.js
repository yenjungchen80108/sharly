import LinkIcon from '../../public/svg/linkIcon.svg';
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
    },
    {
      Header: "URL",
      accessor: "url",
      Cell: ({ cell }) => 
        (<a href={cell.row.original.image}><LinkIcon/></a>)},
    // {
    //   Header: "Category",
    //   accessor: "category",
    // },
];