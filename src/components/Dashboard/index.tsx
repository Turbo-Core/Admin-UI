import React, { useEffect, useState } from "react";
import { Alert, MenuItem, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Cpu from "./cpu";
import FS from "./fs";

export type Sysinfo = {
    cpus: Array<{
        name: string;
        model: string;
        usage: number;
    }>;
    disks: Array<{
        name: string;
        free: number;
        total: number;
    }>;
    mem: {
        free: number;
        total: number;
        used: number;
        swap_free: number;
        swap_total: number;
        swap_used: number;
    };
};

export default function Dashboard() {
    const [sysinfo, setSysinfo] = useState<Sysinfo | null>(null);
    const [currentInterval, setCurrentInterval] =
        useState<NodeJS.Timeout | null>(null);
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const webSocket = new WebSocket("ws://localhost:8080/api/health/ws");
        setWebSocket(webSocket);

        webSocket.onopen = () => {
            webSocket.send("auth eyJhbGciOiJIUzI1NiJ9.eyJleHAiOiIxNjg2NjAzMDgwIiwiaXNzIjoiVHVyYm9Db3JlIiwicm9sZSI6ImFkbWluIiwidHlwZSI6ImF0IiwidWlkIjoiNzI2OTIxNmItZjExYy00OWQ0LThiZmItNzU5M2I4MGFhODhkIn0.KKxbQgoFSPdHzdN2LD4CIJsuCNfIMCqf9hITZZNlCUI");
        };

        webSocket.onmessage = (event) => {
            if (event.data === "ok") {
                const interval = setInterval(() => {
					webSocket.readyState === webSocket.OPEN &&  webSocket.send("sysinfo");
				}, 5 * 1000);
                setCurrentInterval(interval);
                return;
            }
            setSysinfo(JSON.parse(event.data));
            setError(false);
        };

        webSocket.onerror = (_) => {
            setError(true);
        };

        return () => {
            // Clean up code when component unmounts
            if (currentInterval) {
                clearInterval(currentInterval);
            }
            webSocket.readyState === webSocket.OPEN && webSocket.close();
            webSocket.readyState !== webSocket.OPEN &&
                (webSocket.onopen = () => {
                    webSocket.close();
                });
            // Make sure the websocket is closed to avoid multiple connections for each remount
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {error && (
                <Alert severity="error" style={{ margin: "1rem 0" }}>
                    Failed to establish websocket connection with the server.
                    Reload the page to try again.
                </Alert>
            )}
            <Typography variant="h4" fontWeight={600}>
                Dashboard
            </Typography>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" fontWeight={600} marginY="1.5rem">
                    System Information
                </Typography>
                <TextField
                    select
                    label="Refresh Rate"
                    defaultValue={5}
                    size="small"
                    onChange={(e) => {
                        if (currentInterval) {
                            clearInterval(currentInterval);
                        }
                        const interval = setInterval(() => {
							webSocket?.readyState === webSocket?.OPEN &&  webSocket?.send("sysinfo");
						}, parseFloat(e.target.value) * 1000);
                        setCurrentInterval(interval);
                    }}
                >
                    {[0.5, 1, 5, 10, 30, 60].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option} seconds
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <Grid container spacing={4}>
                {/* 2 cols on desktop, 1 col on mobile */}
                <Grid xs={12} md={6}>
                    <Cpu sysinfo={sysinfo} />
                </Grid>
                <Grid xs={12} md={6}>
                    <FS sysinfo={sysinfo} />
                </Grid>
            </Grid>
        </>
    );
}
