'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  ChipProps,
  Snippet,
  Checkbox
} from '@nextui-org/react';

type DNSRecord = {
  valid: boolean;
  type: string;
  host: string;
  data: string;
  reason?: string | null;
};

export default function VerifyDomain() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [dnsRecords, setDnsRecords] = useState<DNSRecord[]>([]);
  const [verified, setVerified] = useState(false);
  const [recordAdded, setRecordAdded] = useState(false);

  const renderChip = (verified: boolean, valid: boolean) => {
    let chipProps: ChipProps;
    if (!verified) {
      chipProps = { color: 'default', children: 'Created' };
    } else if (valid) {
      chipProps = { color: 'success', children: 'Valid' };
    } else {
      chipProps = { color: 'danger', children: 'Invalid' };
    }
    return <Chip {...chipProps} variant="flat" />;
  };

  useEffect(() => {
    const fetchDNSRecords = async () => {
      try {
        const response = await axios.get(`/whitelabel/domains/${id}`);
        const dns = response.data.dns;
        const records: DNSRecord[] = Object.values(dns);
        setDnsRecords(records);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchDNSRecords();
    }
  }, [id]);

  const handleVerify = async () => {
    try {
      const response = await axios.post(`/whitelabel/domains/${id}/validate`);
      const validationResults = response.data.validation_results;

      const updatedRecords: DNSRecord[] = dnsRecords.map(record => {
        const validation = validationResults[record.host];
        return validation
          ? {
              ...record,
              valid: validation.valid,
              reason: validation.reason
            }
          : record;
      });
      
      setDnsRecords(updatedRecords);
      setVerified(true);

      if (response.data.valid) {
        alert('Domain verified successfully');
        router.push('/');
      } else {
        alert('Failed to verify');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <h1 className='my-4'>
        <div className='text-lg'>Domain Authentication</div>
        {dnsRecords.length > 0 ? (
          <div className='text-2xl my-4'>{dnsRecords[0].host}</div>
        ) : (
          <div className='text-2xl my-4'></div>
        )}
      </h1>
      <div className='flex flex-col space-y-5'>
        <Table aria-label="DNS Records">
          <TableHeader>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>HOST</TableColumn>
            <TableColumn>VALUE</TableColumn>
          </TableHeader>
          <TableBody>
            {dnsRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{renderChip(verified, record.valid)}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell><Snippet hideSymbol>{record.host}</Snippet></TableCell>
                <TableCell><Snippet hideSymbol>{record.data}</Snippet></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Checkbox
          isSelected={recordAdded}
          onChange={(e) => setRecordAdded(e.target.checked)}
        >
          I've added these records.
        </Checkbox>
        <Button color='primary' onClick={handleVerify} isDisabled={!recordAdded} className='max-w-24'>Verify</Button>
      </div>
    </div>
  );
}
