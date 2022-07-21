import { Button } from '../../components/Button';
import { LoadingDots } from '../../components/LoadingDots';
import { Container, Spacer, Wrapper } from '../../components/Layout';
import { Text, TextLink } from '../../components/Text';
import { usePartnerPages } from '../../lib/partner';
import { Input, Textarea } from '../../components/Input';
import styles from './Partner.module.css';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Label } from '../../components/Label';

const classes = {
    inlineTag: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2",
    tableHead: "text-sm font-medium text-gray-900 px-6 py-4 text-center",
    tableRow: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",
    iconTableRow: "text-sm text-gray-900 font-light py-4 whitespace-nowrap",
    modalContainer: "flex items-center justify-end p-6 border-t border-solid border-pinkGray-200 rounded-b",
    modalClose: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1",
    modalSave: "text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1",
}

const AddContact = () => {
    const formRef = useRef(null);
    const [form, setForm] = useState({
      name: "",
      phone: "",
      content: "",
    });

    const onUpdateField = e => {
      const nextFormState = {
        ...form,
        [e.target.name]: e.target.value,
      };
      setForm(nextFormState);
    };
    
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbz9XbQbrGGFB7pKTxkuoDuH_Dc8Ba88vZMHlSwJ5_VIrXIyLuP2VCyoeWD9tkjBSvq5SQ/exec';
    
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true);

      // formRef.current
      console.log(form);
      console.log(formRef.current);
      fetch(scriptUrl, {
      method: 'POST',
      body: [form],

    }).then(res => {
      toast.success('We have received your message!');
      setLoading(false);
      })
      .catch(err => console.log(err))
    }

    return (
    <Wrapper>
    <div>
      <section className={styles.partner}>
          <h4 className={styles.sectionTitle}>Contact Us</h4>
          <form method="post" ref={formRef} action={scriptUrl} onSubmit={handleSubmit}>
            <Spacer size={0.5} axis="vertical" />
            <input
            label="name" name="name" placeholder="Your Name" className={styles.input}/>
            {/* <Label
              id="NAME"
              name="name"
              className={styles.input}
              placeholder="Name"
              value={form.name}
              onChange={onUpdateField}
            ></Label> */}
            <Spacer size={0.5} axis="vertical" />
            <input
            label="phone" name="phone" placeholder="Your Phone" className={styles.input} value={form.phone} onChange={onUpdateField}/>
            <Spacer size={0.5} axis="vertical"/>
            <textarea name="content" placeholder="Tell us anything..." rows="4" className={styles.input} value={form.content} onChange={onUpdateField}/>
            <Spacer size={0.5} axis="vertical" />
            <input type="submit" value={+loading ? "Loading..." : "Submit"} className={classes.modalSave}/>
          </form>
      </section>
    </div>
    </Wrapper>
  );
};

export default AddContact;
