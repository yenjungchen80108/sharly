import LinkIcon from '../../public/svg/linkIcon.svg';
export const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Content",
      accessor: "content",
    },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ cell }) => 
        (<a href={cell.row.original.image}><LinkIcon/></a>)},
];