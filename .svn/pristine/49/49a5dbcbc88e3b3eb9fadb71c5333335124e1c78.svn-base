'use client'
import { useState } from 'react';
import { excelToJsonData } from '@/utils/common';
import { useForm } from "@mantine/form";
import { Breadcrumbs, Anchor, FileInput, Grid, Button } from '@mantine/core';
const SocietySetup = () => {
  const [excelData, setExcelData] = useState<any[]>([]);
  const items = [
    { title: 'Setup', href: '#' },
    { title: 'Society Setup', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      file: null,
    },
    validate: {
      file: (value) =>
        value ? null : "Please upload an Excel file",
    },
  });

  const handleSubmit = async (values: any) => {
    const jSondata = await excelToJsonData(values);
    console.log('jSondata', jSondata)
    setExcelData(jSondata);
  };
  
  return (
    <>
      <Breadcrumbs separator=">" separatorMargin="xs" mt="md" mb="md">
        {items}
      </Breadcrumbs>
      <div className="bodySection">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FileInput
                label="Upload Excel File"
                placeholder="Upload .xlsx or .xls"
                accept=".xlsx,.xls"
                key={form.key("file")}
                {...form.getInputProps("file")}
              />
              <div className="buttonSection">
                <Button mt="md" type="submit" mr="xs">
                  Submit
                </Button>
                <Button mt="md" variant="light" color="red" onClick={() => form.reset()}>
                  Clear
                </Button>
              </div>
            </Grid.Col>
          </Grid>
        </form>

      </div>
    </>
  )

}

export default SocietySetup