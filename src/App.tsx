import React, {Component, createElement, ReactPortal} from "react";
import {createPortal} from 'react-dom';

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-balham.css";
import "./App.css";

import {CellComponent} from "./CellComponent";
import {getRandomRows} from "./rowData";
import {AgGridReact} from "@ag-grid-community/react";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
// const CellComponent = (props: any) => <div>{props.value}</div>;

/*
class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.getRowNodeId = this.getRowNodeId.bind(this);
        this.state = {
            columnDefs: [
                {
                    field: "make",
                    cellRenderer: "cellComponent",
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
*/

export class TestComponent extends Component<any> {
    render() {
        return <div style={{height: 20}}>Test Component</div>;
    }
}

class App extends Component<any, any> {
    portals: ReactPortal[] = [];
    key = 0;
    eParentElement: any;

    render() {
        return createElement(React.Fragment, null,
            createElement("button", {
                onClick: () => {
                    this.createPortal();
                }
            }, "Create Portal"),
            createElement("button", {
                onClick: () => {
                    this.deletePortal();
                }
            }, "Delete Portal"),
            createElement('div', {}, this.portals));
    }

    createPortal() {
        this.eParentElement = document.createElement('span');
        const reactComponent = createElement(TestComponent, {
            ref: (element: any) => {
                debugger
                console.log(element);
                document.querySelector("#container")!.appendChild(this.eParentElement)
            }
        });
        const portal: ReactPortal = createPortal(
            reactComponent,
            this.eParentElement,
            "" + this.key++
        );

        this.portals.push(portal);

        this.forceUpdate(() => {
            console.log("create refresh");
        });
    }

    deletePortal() {
        console.log("detelet");
        this.portals = [];

        this.forceUpdate(() => {
            debugger
            console.log("delete refresh");
            document.querySelector("#container")!.removeChild(this.eParentElement)
        });
    }
}

export default App;
