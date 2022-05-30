import { Avatar } from '../Avatar';
import { Container } from '../Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx'; // clsx is generally used to conditionally apply a given className
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Card.module.css';

const classes = {
  inlineTag: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
}

const Card = ({ card, className }) => {
  let separateTags = card.tags.join(',').split(',');
  // console.log('separateTags',separateTags.map(item => console.log('item', item)));
  
//   const timestampTxt = useMemo(() => {
//     const diff = Date.now() - new Date(comment.createdAt).getTime();
//     if (diff < 1 * 60 * 1000) return 'Just now';
//     return `${format(diff, true)} ago`;
//   }, [comment.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
       <div className="max-w-sm max-h-96 rounded overflow-hidden shadow-lg">
          <img className="w-full max-h-40" src={card.image} alt="image"/>
          <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{card.title}</div>
              <p className="text-gray-700 text-base">{card.content}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <div className="tags-input-container">
                <div className="tag-item">
                  {separateTags.map((item, id) => {
                    return <span className={classes.inlineTag} key={id}>{item}</span>
                  })}
                </div>
            </div>
              {/* <span className={classes.inlineTag}>#photography</span>
              <span className={classes.inlineTag}>#travel</span>
              <span className={classes.inlineTag}>#winter</span> */}
          </div>
        </div> 
    </div>
  );
};

export default Card;
