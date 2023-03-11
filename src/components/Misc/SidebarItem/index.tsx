import React, { ReactElement } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import style from "./style.module.css";
import Typography from "@mui/material/Typography";
import classNames from "classnames";

export default function SidebarItem({
  title,
  Icon,
  open,
  active,
  ...props
}: {
  title: string;
  Icon: ReactElement<any, any>;
  open: boolean;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={classNames(
        style.SidebarItem,
        active && style.active,
        open && active && style.indicator,
        !open && style.justifyCenter
      )}
      {...props}
    >
      <>
        {Icon}
        {open && (
          <Typography
            variant="body1"
            className={style.text}
            sx={{ color: "inherit" }}
          >
            {title}
          </Typography>
        )}
      </>
    </div>
  );
}
