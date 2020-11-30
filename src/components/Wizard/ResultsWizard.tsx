import React from 'react';
import WizardProvider from 'context/stores/wizard';
import WizardRoutes from 'routes/WizardRoutes';

const ResultsWizard: React.FC = (props) => {
  return (
    <WizardProvider>
      <WizardRoutes />
    </WizardProvider>
  );
};

export default ResultsWizard;
