'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Input, Checkbox, Button } from '@nextui-org/react';

export default function DomainAuthentication() {
  const [domain, setDomain] = useState('');
  const [automatedSecurity, setAutomatedSecurity] = useState(true);
  const [customDKIM, setCustomDKIM] = useState(false);
  const [dkimSelector, setDkimSelector] = useState('');
  const router = useRouter();

  const handleNext = async () => {
    try {
      const response = await axios.post('/whitelabel/domains', {
        domain,
        automatedSecurity,
        customDKIM,
        dkimSelector: customDKIM ? dkimSelector : null,
      });
      router.push(`/domain/${response.data.id}/verify`);
    } catch (error) {
      console.error(error);
    }
  };

  const isDomainEmpty = (domain: string): boolean => {
    return domain === '';
  };

  return (
    <div>
      <h1 className='my-4 text-lg'>Domain Authentication</h1>
      <div className='flex flex-col space-y-5'>
        <Input
          label="From Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          isRequired
          className='max-w-96'
        />
        <div className='flex flex-col space-y-2'>
          <Checkbox
            isSelected={automatedSecurity}
            onChange={(e) => setAutomatedSecurity(e.target.checked)}
          >
            Use automated security
          </Checkbox>
          <Checkbox
            isSelected={customDKIM}
            onChange={(e) => setCustomDKIM(e.target.checked)}
          >
            Use a custom DKIM selector
          </Checkbox>
          {customDKIM && (
            <Input
              label="DKIM Selector"
              value={dkimSelector}
              onChange={(e) => setDkimSelector(e.target.value)}
              description = 'Enter up to 3 letters or numbers.'
              maxLength={3}
              className='max-w-96'
            />
          )}
        </div>
        <Button color='primary' onPress={handleNext} isDisabled={isDomainEmpty(domain)} className='max-w-24'>Next</Button>
      </div>
    </div>
  );
}