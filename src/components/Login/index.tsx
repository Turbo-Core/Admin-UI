// Adapted from: https://mui.com/joy-ui/getting-started/templates/
import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import customTheme from "@/components/Login/theme";
import Image from "next/image";
import { getMediaQueryPreference } from "@/util";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

type Mode = "light" | "dark" | "system";

interface ColorSchemeToggleProps extends IconButtonProps {
    mode: Mode | undefined;
    setMode: (mode: "light" | "dark") => void;
}

function ColorSchemeToggle({
    onClick,
    mode,
    setMode,
    ...props
}: ColorSchemeToggleProps) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <IconButton size="sm" variant="plain" color="neutral" disabled />
        );
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="plain"
            color="neutral"
            {...props}
            onClick={(event) => {
                if (mode === "light") {
                    setMode("dark");
                } else {
                    setMode("light");
                }
                onClick?.(event);
            }}
        >
            {mode === "light" ? (
                <DarkModeRoundedIcon />
            ) : (
                <LightModeRoundedIcon />
            )}
        </IconButton>
    );
}

export default function Login({
    login,
}: {
    login: (email: string, password: string) => void;
}) {
    const [lightMode, setLightMode] = React.useState(false);
    React.useEffect(() => {
        setLightMode(getMediaQueryPreference(window) === "light")
    }, []);
    return (
        <CssVarsProvider
            defaultMode={lightMode ? "light" : "dark"}
            disableTransitionOnChange
            theme={customTheme}
        >
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ":root": {
                        "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
                        "--Cover-width": "0", // must be `vw` only
                        "--Form-maxWidth": "700px",
                        "--Transition-duration": "0.4s", // set to `none` to disable transition
                    },
                }}
            />
            <Content login={login} />
        </CssVarsProvider>
    );
}

function Content({
    login,
}: {
    login: (email: string, password: string) => void;
}) {
    const { mode, setMode } = useColorScheme();
    return (
        <Box
            sx={(theme) => ({
                width: "100vw",
                transition: "width var(--Transition-duration)",
                transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                backgroundColor: "rgb(240 240 240)",
                [theme.getColorSchemeSelector("dark")]: {
                    backgroundColor: "rgb(12 12 12)",
                },
            })}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100dvh",
                    width: "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
                    maxWidth: "100%",
                    px: 2,
                }}
            >
                <Box
                    component="header"
                    sx={{
                        py: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Image
                        src={"/logo.svg"}
                        width={150}
                        height={100}
                        alt=""
                        style={{
                            filter: mode === "light" ? "invert(1)" : "none",
                        }}
                        priority
                    />
                    <ColorSchemeToggle mode={mode} setMode={setMode} />
                </Box>
                <Box
                    component="main"
                    sx={{
                        my: "auto",
                        py: 2,
                        pb: 5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: 400,
                        maxWidth: "100%",
                        mx: "auto",
                        borderRadius: "sm",
                        "& form": {
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        },
                        [`& .${formLabelClasses.asterisk}`]: {
                            visibility: "hidden",
                        },
                    }}
                >
                    <div>
                        <Typography
                            component="h2"
                            fontSize="xl2"
                            fontWeight="lg"
                        >
                            Welcome back
                        </Typography>
                        <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                            Let&apos;s do this! Please enter your details.
                        </Typography>
                    </div>
                    <form
                        onSubmit={(
                            event: React.FormEvent<SignInFormElement>
                        ) => {
                            event.preventDefault();
                            const formElements = event.currentTarget.elements;
                            const data = {
                                email: formElements.email.value,
                                password: formElements.password.value,
                            };
                            login(data.email, data.password);
                        }}
                    >
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input
                                placeholder="•••••••"
                                type="password"
                                name="password"
                            />
                        </FormControl>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Link
                                fontSize="sm"
                                href="#replace-with-a-link"
                                fontWeight="lg"
                            >
                                Forgot password
                            </Link>
                        </Box>
                        <Button type="submit" fullWidth>
                            Sign in
                        </Button>
                    </form>
                </Box>
                <Box component="footer" sx={{ py: 3 }}>
                    <Typography level="body3" textAlign="center">
                        TurboCore
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
