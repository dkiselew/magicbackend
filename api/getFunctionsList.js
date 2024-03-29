import asyncExec from './asyncExec';
import shellParser from 'node-shell-parser';

export default async () => {      
  const namespace = 'default';
  const results = await Promise.all([
    asyncExec(`fission function list --namespace ${namespace}`, { silent: true }),
    asyncExec(`fission httptrigger list --namespace ${namespace}`, { silent: true }),
  ]);  
   
  const functions = shellParser(results[0]);
  const triggers = shellParser(results[1]);    

  return functions.map((func) => {
    const trigger = triggers.find((trigger) => trigger['FUNCTION(s)'] === func.NAME);
    return {
      name: func.NAME,
      env: func.ENV,
      method: trigger ? trigger.METHOD : null,      
      path: trigger ? trigger.URL : null,
      triggerName: trigger ? trigger.NAME : null,      
    };
  });  
}
