import React from "react";

export class CellComponent extends React.Component<any> {
	render() {
		return <div>{this.props.value}</div>;
	}
}
