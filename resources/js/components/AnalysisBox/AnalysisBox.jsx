import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './AnalysisBox.css'
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => { return Math.round(Math.random() * 100) }),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => { return Math.round(Math.random() * 100) }),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Dataset 3',
            data: labels.map(() => { return Math.round(Math.random() * 100) }),
            borderColor: 'rgb(241, 247, 133)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
function AnalysisBox(props) {
    return (
        <div className="analysisbox">
            {props.children}
            
            <div className="analysis-graph">
                <Line options={options} data={props.Data} />
            </div>

        </div>
    );
}

export default AnalysisBox;

export function AnalysisItemInfo(props) {
    return (
        <div className={props.className ? "anal-info-item " + props.className : "anal-info-item"}>
            <div className="anal-info-title">
                {props.title}
            </div>
            <div className="anal-info-content">
                {props.content}
            </div>
            <div className="anal-info-time">
                {props.time}
            </div>
        </div>
    );
}