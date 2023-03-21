import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Paper, Skeleton, Typography } from "@mui/material";
import { FiCpu } from "react-icons/fi";
import style from "./style.module.css";
import type { Sysinfo } from "./index";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    marginBottom: "0.75rem",
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
}));

export default function Cpu({ sysinfo }: { sysinfo: Sysinfo | null }) {
    return (
        <Paper elevation={1} style={{ padding: "1rem", borderRadius: "1rem" }}>
            <Typography
                variant="h5"
                fontWeight={600}
                className={style.sysInfoHeading}
            >
                <FiCpu /> CPU Usage
            </Typography>
            {sysinfo &&
                sysinfo.cpus.map((cpu, index) => {
                    return (
                        <div key={index}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "0.5rem",
                                }}
                            >
                                <div>
                                    {cpu.name}: {cpu.model}
                                </div>
                                <div>{cpu.usage << 0 /* floor */}%</div>
                            </div>
                            <BorderLinearProgress
                                variant="determinate"
                                value={cpu.usage}
                            />
                        </div>
                    );
                })}
            {!sysinfo &&
                [1, 2, 3, 4].map((_, index) => (
                    <div key={index}>
                        <Skeleton
                            variant="rounded"
                            width="30%"
                            height="10px"
                            className={style.skeleton}
                        />
                        <Skeleton
                            variant="rounded"
                            width="90%"
                            height="10px"
                            className={style.skeleton}
                        />
                    </div>
                ))}
        </Paper>
    );
}
