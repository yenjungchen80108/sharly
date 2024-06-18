import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Spacer, Wrapper } from "../../components/Layout";
import { TextLink } from "../../components/Text";
import { fetcher } from "../../lib/fetch";
import { useCurrentUser } from "../../lib/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import styles from "./Auth.module.css";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();
  const { t } = useTranslation();
  const { mutate } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await fetcher("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
            username: usernameRef.current.value,
          }),
        });
        mutate({ user: response.user }, false);
        toast.success("Your account has been created");
        router.replace("/");
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, router]
  );

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <h1 className={styles.title}>{t("REGISTER.TITLE")}</h1>
        <form onSubmit={onSubmit}>
          <Container alignItems="center">
            <p className={styles.subtitle}>Your Account</p>
            <div className={styles.separator} />
          </Container>
          <Input
            ref={emailRef}
            htmlType="email"
            autoComplete="email"
            placeholder="Email Address"
            ariaLabel="Email Address"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          <Input
            ref={passwordRef}
            htmlType="password"
            autoComplete="new-password"
            placeholder="Password"
            ariaLabel="Password"
            size="large"
            required
          />
          <Spacer size={0.75} axis="vertical" />
          <Container alignItems="center">
            <p className={styles.subtitle}>About you</p>
            <div className={styles.separator} />
          </Container>
          <Input
            ref={usernameRef}
            autoComplete="username"
            placeholder="Username"
            ariaLabel="Username"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          <Input
            ref={nameRef}
            autoComplete="name"
            placeholder="Your name"
            ariaLabel="Your name"
            size="large"
            required
          />
          <Spacer size={1} axis="vertical" />
          <Button
            htmlType="submit"
            className={styles.submit}
            type="success"
            size="large"
            loading={isLoading}
          >
            {t("REGISTER.START")}
          </Button>
        </form>
      </div>
      <div className={styles.footer}>
        <Link href="/login" passHref>
          <TextLink color="link" variant="highlight">
            Already have an account? Log in
          </TextLink>
        </Link>
      </div>
    </Wrapper>
  );
};

export default SignUp;
