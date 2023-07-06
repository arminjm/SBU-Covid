import React from 'react';

export default class ProgressBar extends React.Component {
    render() {
        return (
            <div className="d-flex spinner-border text-danger m-auto" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
}
