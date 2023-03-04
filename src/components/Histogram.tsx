import {
    BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis,
} from 'recharts';

import { RData } from '../Data';

interface Props {
    data: RData
}

const FileUploader = ({
    data,
}: Props) => {
    const drawableData = data.Vectors[1].map((e, i) => ({
        name: i.toString(),
        value: e,
    }));

    console.log('drawableData', drawableData);

    return (
        <ResponsiveContainer
            width="100%"
            aspect={3}
        >
            <BarChart
                width={150}
                height={40}
                data={drawableData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis />
                <YAxis />
                <Bar
                    dataKey="value"
                    fill="#8884d8"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};
export default FileUploader;
