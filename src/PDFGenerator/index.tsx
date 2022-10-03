import {
  Typography,
  TextField,
  Button,
  Card,
  Container,
  Grid,
  CardHeader,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

type Education = {
  DateRange: Date[];
  Details: string;
  LevelTitle: string;
  LevelDescription: string[];
};

type SchoolRelated = {
  title: string;
  details: string;
};

function PDFGenerator() {
  const [characterReference, setCharacterReference] = useState([]);
  const [educationArr, setEducationArr] = useState<Education[]>([]);
  const [aboutMe, setAboutMe] = useState<string>('');
  const [phone, setPhone] = useState<number>();
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [schoolRelatedWorks, setSchoolRelatedWorks] = useState<SchoolRelated[]>(
    []
  );

  const educationDateStart = (val: any, index: number) => {
    const date = new Date(val);
    const res = [...educationArr];
    res[index].DateRange.unshift(date);
    setEducationArr(res);
  };

  const educationDateEnd = (val: any, index: number) => {
    const date = new Date(val);
    const res = [...educationArr];
    res[index].DateRange.push(date);
    setEducationArr(res);
  };

  const addEducationField = () => {
    const education: Education = {
      DateRange: [],
      Details: '',
      LevelTitle: '',
      LevelDescription: [],
    };
    const current = [...educationArr];
    current.push(education);
    setEducationArr(current);
  };

  const deleteEducationField = () => {
    const current = [...educationArr];
    current.splice(current.length - 1, 1);
    setEducationArr(current);
  };

  const addEducationLevelDescription = (index: number) => {
    const current = [...educationArr];
    current[index].LevelDescription.push('');
    setEducationArr(current);
  };

  const deleteEducationLevelDescription = (index: number) => {
    const current = [...educationArr];
    current[index].LevelDescription.splice(
      current[index].LevelDescription.length - 1,
      1
    );
    setEducationArr(current);
  };

  const addSchoolRelatedWorks = () => {
    const current = [...schoolRelatedWorks];
    current.push({ title: '', details: '' });
    setSchoolRelatedWorks(current);
  };

  const deleteSchoolRelatedWorks = () => {
    const current = [...schoolRelatedWorks];
    current.splice(current.length - 1, 1);
    setSchoolRelatedWorks(current);
  };

  const handleEducationDetails = (e: any, index: number) => {
    const current = [...educationArr];
    current[index].Details = e.target.value;
    setEducationArr(current);
  };

  const handleEducationLevelTitle = (e: any, index: number) => {
    const current = [...educationArr];
    current[index].LevelTitle = e.target.value;
    setEducationArr(current);
  };

  const handleSchoolRelated = (e: any, index: number, type: string) => {
    if (type === 'title') {
      const current = [...schoolRelatedWorks];
      current[index].title = e.target.value;
      setSchoolRelatedWorks(current);
    } else if (type === 'detail') {
      const current = [...schoolRelatedWorks];
      current[index].details = e.target.value;
      setSchoolRelatedWorks(current);
    }
  };

  console.log('details', phone, email, address, aboutMe);

  return (
    <Container maxWidth="sm">
      <Card>
        <Grid
          alignItems={'center'}
          direction="column"
          justifyContent="center"
          container
        >
          <Grid item>
            <CardHeader title="PDF generator" />
          </Grid>
          <Divider />
          <Typography>About me </Typography>
          <TextField
            value={aboutMe}
            onChange={c => setAboutMe(c.target.value)}
            label="Details"
            variant="filled"
          ></TextField>
          <Typography> Character Reference</Typography>
          <Button> + </Button> <Button> - </Button>
          {characterReference.map(c => (
            <>
              <TextField label="Name" variant="filled"></TextField>
              <TextField label="Title" variant="filled"></TextField>
              <TextField label="Contact" variant="filled"></TextField>
            </>
          ))}
          <TextField
            onChange={e => setPhone(parseInt(e.target.value))}
            value={phone}
            type={'number'}
            label="Phone"
            variant="filled"
          ></TextField>
          <TextField
            onChange={e => setEmail(e.target.value)}
            value={email}
            type={'email'}
            label="Email"
            variant="filled"
          ></TextField>
          <TextField
            onChange={e => setAddress(e.target.value)}
            value={address}
            label="Address"
            variant="filled"
          ></TextField>
          <Typography>Education</Typography>
          <Button
            onClick={() => {
              addEducationField();
            }}
          >
            {' '}
            +{' '}
          </Button>{' '}
          <Button
            onClick={() => {
              deleteEducationField();
            }}
          >
            {' '}
            -{' '}
          </Button>
          {educationArr.map((c, index) => (
            <>
              <DatePicker
                key={`startDate${index}`}
                label="Start Date"
                views={['year']}
                value={c.DateRange[0]}
                onChange={newValue => {
                  educationDateStart(newValue, index);
                }}
                renderInput={params => <TextField {...params} />}
              />
              <DatePicker
                key={`endDate${index}`}
                label="End Date"
                views={['year']}
                value={c.DateRange[1]}
                onChange={newValue => {
                  educationDateEnd(newValue, index);
                }}
                renderInput={params => <TextField {...params} />}
              />
              <TextField
                value={c.Details}
                onChange={e => handleEducationDetails(e, index)}
                label="Details"
              />
              <TextField
                value={c.LevelTitle}
                onChange={e => handleEducationLevelTitle(e, index)}
                label="Level title"
              />
              <Typography>Description</Typography>
              <Button
                onClick={() => {
                  addEducationLevelDescription(index);
                }}
              >
                {' '}
                +{' '}
              </Button>{' '}
              <Button
                onClick={() => {
                  deleteEducationLevelDescription(index);
                }}
              >
                {' '}
                -{' '}
              </Button>
              {educationArr[index].LevelDescription.map(c => (
                <TextField label="details" />
              ))}
            </>
          ))}
          <Typography>Other School Related Works</Typography>
          <Button
            onClick={() => {
              addSchoolRelatedWorks();
            }}
          >
            {' '}
            +{' '}
          </Button>{' '}
          <Button
            onClick={() => {
              deleteSchoolRelatedWorks();
            }}
          >
            {' '}
            -{' '}
          </Button>
          {schoolRelatedWorks.map((x, index) => (
            <>
              <TextField
                value={x.title}
                onChange={e => handleSchoolRelated(e, index, 'title')}
                key={`title${index}`}
                label="title"
              ></TextField>
              <TextField
                value={x.details}
                onChange={e => handleSchoolRelated(e, index, 'detail')}
                key={`details${index}`}
                label="details"
              ></TextField>
            </>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default PDFGenerator;
