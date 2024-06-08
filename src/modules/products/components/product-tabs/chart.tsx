import React from 'react';

interface ChartProps {
    chartArray: string[][];
}

const Chart: React.FC<ChartProps> = ({chartArray}: ChartProps) => {
    return (
        <table className="table-auto border-separate border-spacing-0 border border-ui-border-strong rounded-md mt-1">
            <tbody>
            {chartArray.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((col, colIndex) => (
                    rowIndex === 0 ? (
                        <th key={`${rowIndex}-${colIndex}`} className="px-2 text-center border-b bg-ui-bg-switch-off">{col}</th>
                    ) : (
                        <td key={`${rowIndex}-${colIndex}`} className="text-center border-t">{col}</td>
                    )
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    );
};


export default Chart;