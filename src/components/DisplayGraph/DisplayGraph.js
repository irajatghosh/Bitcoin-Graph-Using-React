
import Card from "../UI/Card"
import LineChart from "../Charts/LineChart"
import classes from "./DisplayGraph.module.css"
const DisplayGraph = (props) => {
    return (
        <Card className={classes.graph}>
            <LineChart data={props.coinData} />
        </Card>
    )
}

export default DisplayGraph
