import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import style from "./style.module.css";
import SidebarItem from "../Misc/SidebarItem";

// Icons
import SpeedRoundedIcon from "@mui/icons-material/Speed";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Image from "next/image";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type SidebarProps = {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  logout: () => void;
};

export default function Sidebar({
  children,
  currentPage,
  setCurrentPage,
  logout
}: SidebarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} PaperProps={{elevation: 1}}>
        <DrawerHeader
          className={open ? "fixedHeight" : style.drawerHeaderCenter}
        >
          {open && (
            <div style={{ width: "100%", boxSizing: "border-box", marginLeft: "10px" }}>
              <Image src="/logo.svg" width={165} height={75} alt="TurboCore Logo" />
            </div>
          )}
          <IconButton onClick={toggleDrawer}>
            {!open ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List className={style.padding}>
        <div className={style.divider} />
          <SidebarItem
            title="Dashboard"
            Icon={<SpeedRoundedIcon fontSize="medium" />}
            open={open}
            active={currentPage === "DASHBOARD"}
            onClick={() => setCurrentPage("DASHBOARD")}
          />
          <SidebarItem
            title="Authentication"
            Icon={<GroupRoundedIcon fontSize="medium" />}
            open={open}
            active={currentPage === "AUTHENTICATION"}
            onClick={() => setCurrentPage("AUTHENTICATION")}
          />
        </List>
        <List style={{ marginTop: `auto` }} className={style.padding}>
        <div className={style.divider} />
          <SidebarItem
            title="Settings"
            Icon={<SettingsRoundedIcon fontSize="medium" />}
            open={open}
            active={currentPage === "SETTINGS"}
            onClick={() => setCurrentPage("SETTINGS")}
          />
        <SidebarItem
            title="Logout"
            Icon={<PowerSettingsNewRoundedIcon fontSize="medium" />}
            open={open}
            active={false}
            onClick={() => logout()}
          />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
