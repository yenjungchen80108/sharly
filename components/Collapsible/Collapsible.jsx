import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

export const handleScrollTo = (ref) => {
  if (ref && ref?.current) {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }
};

const Collapsible = ({
  className,
  children,
  defaultHeight,
  isShowBtnText = true,
  btnSuffix = "",
  isDefaultOpen = false,
}) => {
  const { t } = useTranslation();
  const contentRef = useRef(null);
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [contentHeight, setContentHeight] = useState(0);

  const btnText = isOpen ? t("CART.ACTION.COLLAPSE") : t("CART.ACTION.VIEW");

  const toggleCollapsible = () => {
    setIsOpen((pre) => !pre);
    if (!isOpen) return;
    handleScrollTo(contentRef, { behavior: "auto" });
  };

  useEffect(() => {
    if (contentRef?.current) {
      setContentHeight(contentRef?.current?.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className={className}>
      <button
        className="w-11/12 flex justify-center items-center bg-pink-100 shadow-md mt-3 m-auto"
        onClick={toggleCollapsible}
      >
        <div className="w-full flex justify-center items-center text-pink-500">
          {isShowBtnText && btnText}&nbsp;
          {btnSuffix}
          {isOpen ? (
            <ChevronUpIcon className=" h-6 w-6 m-1 text-pink-500" />
          ) : (
            <ChevronDownIcon className=" h-6 w-6 m-1 text-pink-500" />
          )}
        </div>
      </button>
      <StyledContent
        className={classNames("content", { active: isOpen })}
        defaultHeight={defaultHeight || 0}
        scrollHeight={contentHeight}
        ref={contentRef}
      >
        {children}
      </StyledContent>
    </div>
  );
};

export default styled(Collapsible)`
  position: relative;
  padding-bottom: 10px;

  .btn-more {
    color: #fff;
    background: linear-gradient(90.08deg, #d22065 29.77%, #e7588e 88.76%);
    padding: 5px 12px;
    margin: 5px auto;
    width: 90%;
    z-index: 0;
  }

  .content {
    border: ${({ isShowBorder }) =>
      isShowBorder ? `1px solid #D21E65` : "none"};
    border-radius: ${({ isShowBorder }) =>
      isShowBorder ? `0 0 7px 7px` : "none"};
  }
`;

export const StyledContent = styled.div`
  max-height: ${({ defaultHeight }) => defaultHeight ?? 0};
  transition: max-height
    ${({ scrollHeight }) =>
      `${scrollHeight * 0.001 > 0.8 ? 0.8 : scrollHeight * 0.001}s`}
    ease;
  overflow: hidden;
  position: relative;

  &.active {
    max-height: ${({ scrollHeight = 0 }) => `${scrollHeight}px`};
  }
`;
