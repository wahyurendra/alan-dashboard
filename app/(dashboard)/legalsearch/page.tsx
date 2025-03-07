import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function LegalSearchPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Perkara</CardTitle>
        <CardDescription>Manajemen data perkara hukum</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No Perkara</TableHead>
              <TableHead>Pokok Perkara</TableHead>
              <TableHead>Amar Putusan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123/Pdt.G/2023/PN.JKT</TableCell>
              <TableCell>Sengketa Tanah</TableCell>
              <TableCell>Dikabulkan Sebagian</TableCell>
              <TableCell>Aktif</TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}