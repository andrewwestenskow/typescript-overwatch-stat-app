import React, {ReactNode} from 'react';

function renderComponent<P>(WrappedComponent: React.FC, props: P): ReactNode {
  return <WrappedComponent {...props} />;
}

export default renderComponent;
