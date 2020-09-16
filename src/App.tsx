import React from "react";
import {AgGridReact, ChangeDetectionStrategyType} from "@ag-grid-community/react";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-balham.css";
import "./App.css";

import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";

// import {CellComponent} from "./CellComponent";
import {getRandomRows} from "./rowData";
const CellComponent = (props: any) => <div>{props.value}</div>;


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.getRowNodeId = this.getRowNodeId.bind(this);
        this.state = {
            columnDefs: [
                {
                    field: "make",
                    // cellRenderer: "cellComponent",
                }
            ],
            rowData: [],
        };
    }

    getRowNodeId = (data: any) => data.id;


    componentDidMount(): void {
        // const newData = getRandomRows();
        // setTimeout(() => {
        //     this.setState({rowData: newData});
        //     setTimeout(() => this.setState({rowData: []}), 1000)
        // }, 5000)

        // setTimeout(() => {
        //     this.setState({rowData: newData}, () => {
        //         setTimeout(() => {
        //             this.setRowData(20);
        //         }, 5000)
        //
        //         setTimeout(() => this.setState({rowData: []}), 10000)
        //     });
        // }, 5000)
    }

    render() {
        const times = 20;

        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: "500px",
                    width: "600px",
                }}
            >
                <button
                    onClick={() => {
                        const newData = getRandomRows();
                        this.setState({rowData: newData});
                    }}
                >
                    Get Initial Data
                </button>
                <button
                    onClick={() => {
                        this.setRowData(times);
                    }}
                >
                    Set Row Data (x{times})
                </button>
                <button
                    onClick={() => {
                        this.setState({rowData: []})
                    }}
                >
                    Clear Row Data
                </button>
                <AgGridReact
                    modules={[ClientSideRowModelModule]}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    disableStaticMarkup={true}
                    frameworkComponents={{cellComponent: CellComponent}}
                    // immutableData
                    // getRowNodeId={this.getRowNodeId}
                    // animateRows
                ></AgGridReact>
            </div>
        );
    }

    private setRowData(times: number) {
        if(times > 0) {
            const newData = getRandomRows();
            console.log("Setting State");
            this.setState({rowData: newData}, () => this.setRowData(times - 1));
        }
    }
}

export default App;
