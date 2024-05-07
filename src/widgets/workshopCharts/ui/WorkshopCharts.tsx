import {Grid, Typography} from "@mui/material";
import {WorkshopWoodsBar, WorkshopWoodsDiametersLine, WorkshopWoodsTotalLine} from "@/entities/workshop";

export const WorkshopCharts = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={4}>
                <Typography>Вход</Typography>
                <WorkshopWoodsDiametersLine/>
            </Grid>

            <Grid item xs={12} lg={6} xl={4}>
                <Typography>Выход</Typography>
                <WorkshopWoodsBar/>
            </Grid>

            <Grid item xs={12} lg={6} xl={4}>
                <Typography>Итог</Typography>
                <WorkshopWoodsTotalLine/>

            </Grid>
        </Grid>
    )
}