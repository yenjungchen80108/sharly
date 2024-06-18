import { Button } from "../../components/Button";
import { ButtonLink } from "../../components/Button/Button";
import { Input } from "../../components/Input";
import { Spacer, Wrapper } from "../../components/Layout";
import { TextLink } from "../../components/Text";
import { fetcher } from "../../lib/fetch";
import { useCurrentUser } from "../../lib/user";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useReducer,
  useMemo,
} from "react";
import toast from "react-hot-toast";
import styles from "./Auth.module.css";
import { useTranslation } from "react-i18next";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.includes("@") };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.trim().length > 6 };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { t } = useTranslation();
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const router = useRouter();
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    optimizedEmailHandler(event.target.value);
    setFormIsValid(emailIsValid && passwordIsValid);
  };

  const debounceFunc = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedEmailHandler = useCallback(
    debounceFunc((val) => {}, 500),
    []
  );

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    optimizedPasswordHandler(event.target.value);
    setFormIsValid(emailIsValid && passwordIsValid);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedPasswordHandler = useCallback(
    debounceFunc((val) => {}, 500),
    []
  );

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  useEffect(() => {
    if (isValidating) return;
    if (user) router.replace("/");
  }, [user, router, isValidating]);

  const onSubmit = useCallback(
    async (event) => {
      setIsLoading(true);
      event.preventDefault();
      try {
        const response = await fetcher("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        });
        mutate({ user: response.user }, false);
        toast.success("You have been logged in.");
      } catch (e) {
        toast.error("Incorrect email or password.");
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <h1 className={styles.title}>{t("LOGIN.TITLE")}</h1>
        <form onSubmit={onSubmit}>
          <div
            className={`${styles.control} ${
              emailState.isValid === false ? styles.invalid : ""
            }`}
          >
            <input
              ref={emailRef}
              placeholder="Email Address"
              size="large"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
              required
            />
          </div>
          <Spacer size={0.5} axis="vertical" />
          <div
            className={`${styles.control} ${
              passwordState.isValid === false ? styles.invalid : ""
            }`}
          >
            <input
              ref={passwordRef}
              placeholder="Password"
              size="large"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              required
            />
          </div>
          <Spacer size={0.5} axis="vertical" />
          <Button
            htmlType="submit"
            className={styles.submit}
            type="success"
            size="large"
            loading={isLoading}
            disabled={!formIsValid}
          >
            Log in
          </Button>
          <Spacer size={0.25} axis="vertical" />
          <Link href="/forget-password" passHref>
            <ButtonLink type="success" size="large" variant="ghost">
              {t("LOGIN.FORGET_PW")}
            </ButtonLink>
          </Link>
        </form>
      </div>
      <div className={styles.footer}>
        <Link href="/sign-up" passHref>
          <TextLink color="link" variant="highlight">
            Don&apos;t have an account? Sign Up
          </TextLink>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Login;
