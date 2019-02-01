import React from 'react';
import { withFormsy } from 'formsy-react';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }

    changeValue = (event) => {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        this.forceValue(event.currentTarget.value);
    }

    forceValue = (value) => {
        this.props.setValue(value);
    }

    render() {
        // An error message is returned only if the component is invalid
        const errorMessage = this.props.getErrorMessage();

        return (
            <div>
                <input
                    onChange={this.changeValue}
                    type="text"
                    value={this.props.getValue() || ''}
                    placeholder={this.props.placeholder || ''}
                />
                <span>{errorMessage}</span>
            </div>
        );
    }
}

export default withFormsy(TextInput);