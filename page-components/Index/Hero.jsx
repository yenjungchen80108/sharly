import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Spacer, Wrapper } from "../../components/Layout";

import styles from "./Hero.module.css";
import { TableList } from "../../components/Table";
import { usePostPages } from "../../lib/post";
import { useState, useRef, useCallback } from "react";
import { octokit } from "../../lib/octokit/octokit";
import toast from "react-hot-toast";

const Hero = () => {
  const { data } = usePostPages();
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState();
  const userRef = useRef();
  const [userName, setUserName] = useState("");

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setStatus("loading");
      await octokit
        .request("GET /users/{username}/repos", {
          username: userRef.current.value,
        })
        .then((res) => {
          setRepos(res.data);
          setUserName(userRef.current.value);
          setStatus("success");
          toast.success("successfully retrieve data!");
        });
    } catch (e) {
      toast.error(e.message);
      setStatus(undefined);
    }
  }, []);

  return (
    <Wrapper>
      <div>
        <h1 className={styles.title}>Github repository list</h1>
        <p className={styles.subtitle}>Enter the github username</p>
        <Spacer size={1} />
        <form onSubmit={onSubmit}>
          <Input
            ref={userRef}
            htmlType="user"
            placeholder="Github username(ex:yenjungchen80108)"
            size="large"
          />
          <Spacer size={0.5} axis="vertical" />
          <Button
            htmlType="submit"
            className={styles.submit}
            type="success"
            size="large"
            loading={status === "loading"}
          >
            Start
          </Button>
        </form>
      </div>
      {repos.length > 0 ? (
        <div>
          <h3 className={styles.title}>
            {userName} &nbsp;{`'s github repo list`}
          </h3>
          <div className={styles.wrap}>
            <TableList repos={repos} className={styles.post}></TableList>
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
};

export default Hero;
