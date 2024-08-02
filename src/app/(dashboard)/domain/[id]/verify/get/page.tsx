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
  Snippet
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

  const renderChip = (valid: boolean) => {
    let chipProps: ChipProps;
    if (valid) {
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

  const handleDelete = async () => {
    try {
        await axios.delete(`/whitelabel/domains/${id}/delete`);
        router.push('/');
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='my-4'>
          <div className='text-lg'>Domain Authentication</div>
          {dnsRecords.length > 0 ? (
            <div className='text-2xl my-4'>{dnsRecords[0].host}</div>
          ) : (
            <div className='text-2xl my-4'></div>
          )}
        </h1>
        <Button color='primary' onClick={handleVerify}>Verify</Button>
      </div>
      <Table aria-label='DNS Records'>
        <TableHeader>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>HOST</TableColumn>
          <TableColumn>VALUE</TableColumn>
        </TableHeader>
        <TableBody>
          {dnsRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{renderChip(record.valid)}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell><Snippet hideSymbol>{record.host}</Snippet></TableCell>
              <TableCell><Snippet hideSymbol>{record.data}</Snippet></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color='danger' onClick={handleDelete} className='my-4'>Delete</Button>
    </div>
  );
}
