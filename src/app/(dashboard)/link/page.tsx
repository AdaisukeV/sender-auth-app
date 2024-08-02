'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Input, Checkbox, Button } from '@nextui-org/react';

export default function LinkBranding() {
  const [domain, setDomain] = useState('');
  const [customSubdomain, setCustomSubdomain] = useState(false)
  const [subdomain, setSubdomain] = useState('');
  const router = useRouter();

  const handleNext = async () => {
    try {
      const response = await axios.post('/whitelabel/links', {
        domain,
        customSubdomain,
        subdomain: customSubdomain ? subdomain : null
      });
      router.push(`/link/${response.data.id}/verify`);
    } catch (error) {
      console.error(error);
    }
  };

  const isDomainEmpty = (domain: string): boolean => {
    return domain === '';
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 文字と数字のみの入力を許可する
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setSubdomain(value);
    }
  };

  return (
    <div>
      <h1 className='my-4 text-lg'>Link Branding</h1>
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
            isSelected={customSubdomain}
            onChange={(e) => setCustomSubdomain(e.target.checked)}
          >
            Use a custom link subdomain
          </Checkbox>
          {customSubdomain && (
            <Input
              label="Return Path"
              value={subdomain}
              onChange={handleSubdomainChange}
              description = 'Enter only letters or numbers.'
              className='max-w-96'
            />
          )}
        </div>
        <Button color='primary' onPress={handleNext} isDisabled={isDomainEmpty(domain)} className='max-w-24'>Next</Button>
      </div>
    </div>
  );
}