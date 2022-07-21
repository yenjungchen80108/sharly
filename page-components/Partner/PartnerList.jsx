import { Button } from '../../components/Button';
import { LoadingDots } from '../../components/LoadingDots';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import { Text, TextLink } from '../../components/Text';
import { usePartnerPages } from '../../lib/partner';
import styles from './Partner.module.css';

const classes = {
    inlineTag: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
    tableHead: "text-sm font-medium text-gray-900 px-6 py-4 text-center",
    tableRow: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",
    iconTableRow: "text-sm text-gray-900 font-light py-4 whitespace-nowrap",
    modalContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
    modalClose: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1",
    modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1",
}

// add pagination swr
const PartnerList = () => { 
    const { data, size, setSize, isLoadingMore, isReachingEnd } = usePartnerPages();
    if (!data) return <div></div>;
    const partners = data?.[0]?.partners.length === 0  || data?.[0]?.length === 0? [] : data.reduce((acc, val) => [...acc, ...val.partners], []);
  return (
    <div>
      <Spacer axis="vertical" size={1} />
        {partners ? 
          // <Link
          //   key={post._id}
          //   href={`/user/${post.creator.username}/post/${post._id}`}
          //   passHref
          // >
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="container container m-auto flex flex-wrap flex-col md:flex-row items-center justify-end">
                    {partners.map((partner, id) => (
                      <div key={id} className="shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto border-b-4">
                        <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-45">
                        <div className="block h-auto w-full sm:w-20 lg:w-36 flex-none bg-cover h-24">
                          <img className={styles.partner_icon} src={'/png/donation.png'} /></div>
                        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="text-black font-bold text-xl mb-1">{partner.title}</div>
                        <div className="text-gray-500 text-md italic">{partner.partnerId}</div>
                        <div className="text-gray-400 font-normal text-md mb-1 leading-tight">{partner.content}</div>
                        <p className="text-grey-darker text-base">
                        {partner.tags.join(',').split(',').map((item, id) => {
                        return <span className={classes.inlineTag} key={id}>{item}</span>
                        })}</p>
                        </div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
        : <LoadingDots>Loading</LoadingDots> }
          <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more data are found</Text>
          ) : (
            <Button
              variant="ghost"
              type="success"
              loading={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
            )}
          </Container>
    </div>
  );
};

export default PartnerList;
