import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Paper, Skeleton, Typography } from "@mui/material";
import { FaMemory } from "react-icons/fa";
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

export default function FS({ sysinfo }: { sysinfo: Sysinfo | null }) {
    return (
		<>
        <Paper elevation={1} style={{ padding: "1rem", borderRadius: "1rem" }}>
            <Typography
                variant="h5"
                fontWeight={600}
                className={style.sysInfoHeading}
            >
                <FaMemory /> Memory
            </Typography>
            {sysinfo && (
                <>
                    <p>
                        Memory Usage: {formatBytes(sysinfo.mem.used)} /{" "}
                        {formatBytes(sysinfo.mem.total)}
                    </p>
                    <BorderLinearProgress
                        variant="determinate"
                        value={(sysinfo.mem.used * 100) / sysinfo.mem.total}
                    />
                    {sysinfo.mem.swap_total > 0 && (
                        <>
                            <p>
                                Swap Usage: {formatBytes(sysinfo.mem.swap_used)}{" "}
                                / {formatBytes(sysinfo.mem.swap_total)}
                            </p>
                            <BorderLinearProgress
                                variant="determinate"
                                value={
                                    (sysinfo.mem.swap_used * 100) /
                                    sysinfo.mem.swap_total
                                }
                            />
                        </>
                    )}
					{sysinfo.mem.swap_total === 0 && (
						<p>Swap is not currently being used</p>
					)}
                </>
            )}
			{!sysinfo && (
				<>
					<Skeleton variant="rounded" height={10} width="30%" className={style.skeleton} />
					<Skeleton variant="rounded" height={10} width="90%" className={style.skeleton} />
					<Skeleton variant="rounded" height={10} width="30%" className={style.skeleton} />
					<Skeleton variant="rounded" height={10} width="90%" className={style.skeleton} />
				</>
			)}
        </Paper>
		<Paper elevation={1} style={{ padding: "1rem", borderRadius: "1rem", marginTop: "32px" }}>
			<Typography variant="h5" fontWeight={600} className={style.sysInfoHeading}>
				<FaMemory /> Disks
			</Typography>
			{sysinfo && sysinfo.disks.map((disk, index) => {
				return (
					<div key={index}>
						<div style={{display: 'flex', justifyContent: "space-between", gap: "0.5rem"}}>
							<div>
								{disk.name}
							</div>
							<div>
								{formatBytes(disk.total - disk.free)} / {formatBytes(disk.total)}
							</div>
						</div>
						<BorderLinearProgress
							variant="determinate"
							value={((disk.total - disk.free) * 100) / disk.total}
						/>
					</div>
				)
			}
			)}
			{!sysinfo && (
				<>
					<Skeleton variant="rounded" height={10} width="30%" className={style.skeleton} />
					<Skeleton variant="rounded" height={10} width="90%" className={style.skeleton} />
					<Skeleton variant="rounded" height={10} width="30%" className={style.skeleton} />
					<Skeleton variant="rounded" height={10} width="90%" className={style.skeleton} />
				</>
			)}
		</Paper>
		</>
    );
}

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
