import React from 'react';

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

interface ParamEditorState {
  paramValuesArray: ParamValue[];
}

const params: Param[] = [
  { id: 1, name: 'Назначение' },
  { id: 2, name: 'Длина' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
};

class ParamEditor extends React.Component<ParamEditorProps, ParamEditorState> {
  state: ParamEditorState = {
    paramValuesArray: this.props.model.paramValues,
  };

  getModel(id: number, text: string) {
    this.setState((prev) => ({
      paramValuesArray: prev.paramValuesArray.map(
        (paramValue: ParamValue) =>
          paramValue.paramId === id
            ? { paramId: paramValue.paramId, value: text }
            : paramValue
      ),
    }));
  }

  render() {
    const { paramValuesArray } = this.state;
    const { params } = this.props;
    return (
      <form>
        {params.length > 0 &&
          params.map(({ id, name }: Param) => (
            <div key={id}>
              <label htmlFor={`param-${id}`}>{name}</label>
              {paramValuesArray.length > 0 &&
                paramValuesArray.map(
                  ({ paramId, value }: ParamValue) =>
                    paramId === id && (
                      <input
                        key={paramId}
                        id={`param-${paramId}`}
                        value={value}
                        onChange={(e) => this.getModel(paramId, e.target.value)}
                      />
                    )
                )}
            </div>
          ))}
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return <ParamEditor params={params} model={model} />;
  }
}

export default App;
