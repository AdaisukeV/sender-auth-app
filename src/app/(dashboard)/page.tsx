'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { 
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Card,
  CardHeader,
  CardBody,
  Chip,
  ChipProps
} from '@nextui-org/react';

type Domain = {
  id: string;
  valid: boolean;
  domain: string;
};

type Link = {
  id: string;
  valid: boolean;
  domain: string;
};

type DNSRecord = {
  valid: boolean;
  type: string;
  host: string;
  data: string;
};

export default function Home() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const router = useRouter();

  
  useEffect(() => {
    // Fetch Domain Authentication settings
    axios.get<Domain[]>('/whitelabel?type=domains')
      .then(response => setDomains(response.data))
      .catch(error => console.error(error));

    // Fetch Link Branding settings
    axios.get<Link[]>('/whitelabel?type=links')
      .then(response => setLinks(response.data))
      .catch(error => console.error(error));
  }, []);
  
  const renderChip = (valid: boolean) => {
    const chipProps: ChipProps = valid ? { color: 'success', children: 'Valid' } : { color: 'danger', children: 'Invalid' };
    return <Chip {...chipProps} variant="flat" />;
  };

  const fetchDNSRecords = (data: any) => {
    const dns = data.dns;
    const records: DNSRecord[] = Object.values(dns);
    return records;
  }

  const handleDomainAuthClick = () => {
    router.push('/domain');
  };

  const handleLinkBrandingClick = () => {
    router.push('/link');
  };

  const handleDomainClick = (id: string) => {
    router.push(`/domain/${id}/verify/get`);
  };

  const handleLinkDomainClick = (id: string) => {
    router.push(`/link/${id}/verify/get`);
  };

  return (
    <div className='flex h-full min-h-screen flex-col p-8 space-y-4'>
      <Card className='max-w-[1200px]'>
        <CardHeader>
          <h1>Domain Authentication</h1>
        </CardHeader>
        <CardBody className='mx-20 flex w-full flex-col gap-20 max-w-screen-lg items-start sm:flex-row sm:space-x-4'>
          <Button className='mt-4' color="primary" onPress={handleDomainAuthClick}>
            Add your domain
          </Button>
          <Table selectionMode='single'>
            <TableHeader>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DOMAIN</TableColumn>
            </TableHeader>
            <TableBody>
              {domains.map(domain => (
                <TableRow key={domain.id}>
                  <TableCell>{renderChip(domain.valid)}</TableCell>
                  <TableCell onClick={() => handleDomainClick(domain.id)} style={{ cursor: 'pointer' }}>
                    {fetchDNSRecords(domain)[0].host}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Card className='max-w-[1200px]'>
        <CardHeader>
          <h1>Link Branding</h1>
        </CardHeader>
        <CardBody className='mx-20 flex w-full flex-col gap-20 max-w-screen-lg items-start sm:flex-row sm:space-x-4'>
          <Button className='mt-4' color="primary" onPress={handleLinkBrandingClick}>
            Add your domain
          </Button>
          <Table selectionMode='single'>
            <TableHeader>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DOMAIN</TableColumn>
            </TableHeader>
            <TableBody>
              {links.map(link => (
                <TableRow key={link.id}>
                  <TableCell>{renderChip(link.valid)}</TableCell>
                  <TableCell onClick={() => handleLinkDomainClick(link.id)} style={{ cursor: 'pointer' }}>
                    {fetchDNSRecords(link)[0].host}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
