//@ts-nocheck

import {
  Typography,
  TextField,
  Button,
  Card,
  Container,
  Grid,
  CardHeader,
  Divider,
  Chip,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import ReactPDF, {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
  Image,
  PDFDownloadLink,
  Line,
  Svg,
} from '@react-pdf/renderer';

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

type Work = {
  DateRange: Date[];
  Position: string;
  Company: string;
  JobDetails: string[];
};

type CharacterReference = {
  Name: string;
  Position: string;
  Number: number | string;
};

function PDFGenerator() {
  const [characterReference, setCharacterReference] = useState<
    CharacterReference[]
  >([]);
  const [educationArr, setEducationArr] = useState<Education[]>([]);
  const [workArr, setWorkArr] = useState<Work[]>([]);
  const [aboutMe, setAboutMe] = useState<string>('');
  const [schoolRelatedWorks, setSchoolRelatedWorks] = useState<SchoolRelated[]>(
    []
  );
  const [images, setImage] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<any[]>([]);
  const [programmingSkills, setProgrammingSkills] = useState<string[]>([]);
  const [submit, setSubmit] = useState(false);
  const [fullName, setFullname] = useState('');

  useEffect(() => {
    if (submit) {
      setSubmit(false);
    }
  }, [
    characterReference,
    educationArr,
    aboutMe,
    fullName,
    schoolRelatedWorks,
    images,
    programmingSkills,
  ]);

  Font.register({
    family: 'NunitoExtraBold',
    src: 'NunitoSans-ExtraBold.ttf',
  });
  Font.register({
    family: 'NunitoRegular',
    src: 'NunitoSans-Regular.ttf',
  });
  Font.register({
    family: 'NunitoLight',
    src: 'NunitoSans-Light.ttf',
  });

  Font.register({
    family: 'NunitoSemiBold',
    src: 'NunitoSans-SemiBold.ttf',
  });
  Font.registerHyphenationCallback(word => [word]);

  const styles = StyleSheet.create({
    page: {},
    text: {
      margin: 10,
      fontFamily: 'Oswald',
      textAlign: 'justify',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      flexGrow: 1,
    },
    left: {
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 200,
      color: 'white',
    },

    right: {
      padding: 5,
      flexShrink: 1,
      flexGrow: 2,
    },
    leftBackground: {
      position: 'absolute',
      minWidth: '100%',
      minHeight: '100%',
      height: '100%',
      width: '100%',
    },
    logo: {
      position: 'absolute',
      objectFit: 'cover',
      width: 160,
      marginTop: 20,
      marginLeft: 20,
    },
    image: {
      borderRadius: '60%',
      width: 75,
      height: 75,
      marginTop: 30,
      marginLeft: 60,
      borderColor: 'red',
    },
    fullname: {
      fontSize: 19,
      marginTop: 10,
      marginLeft: 30,
      marginRight: 13,
      fontFamily: 'NunitoExtraBold',
      height: 70,
    },
    aboutMe: {
      fontSize: 12,
      marginTop: 35,
      marginBottom: 10,
      letterSpacing: 1,
      marginLeft: 28,
      fontFamily: 'NunitoSemiBold',
    },
    leftDescription: {
      fontWeight: 'bold',
      fontSize: 8,
      marginLeft: 50,
      marginRight: 15,
      fontFamily: 'NunitoRegular',
      height: 110,
    },
    characterReference: {
      fontSize: 12,
      marginBottom: 10,
      letterSpacing: 1,
      marginLeft: 28,
      fontFamily: 'NunitoSemiBold',
    },
    characterName: {
      fontSize: 9,
      marginBottom: 2,
      fontFamily: 'NunitoExtraBold',
    },
    characterPosition: {
      fontSize: 8,
      marginBottom: 2,
      fontFamily: 'NunitoSemiBold',
    },
    characterNumber: {
      fontSize: 8,
      marginBottom: 10,
      fontFamily: 'NunitoRegular',
    },
    characterReferenceView: {
      marginLeft: 50,
      marginRight: 15,
      height: 200,
    },
    applicantInfo: {
      width: '80%',
      fontSize: 10,
      backgroundColor: 'rgb(64,25,88)',
      textIndent: 10,
      fontFamily: 'NunitoExtraBold',
    },
    view: {
      width: '20%',

      backgroundColor: 'rgb(142,42,164)',
    },
    inline: {
      display: 'flex',
      flexDirection: 'row',
    },
    applicantInformationPhone: {
      marginLeft: 50,
      marginRight: 15,
      fontSize: 8,
      fontFamily: 'NunitoExtraBold',
      marginBottom: 8,
      marginTop: 2,
    },
    applicantInformation: {
      marginLeft: 50,
      marginRight: 15,
      fontSize: 8,
      fontFamily: 'NunitoRegular',
      marginBottom: 8,
      marginTop: 2,
    },
    educationView: {
      marginTop: 20,
      marginLeft: 20,
      height: 180,
    },
    rightTitle: {
      fontSize: 12,
      fontFamily: 'NunitoSemiBold',
      color: 'rgb(156,48,212)',
      letterSpacing: 1,
    },
    educationYear: {
      fontSize: 8,
      fontFamily: 'NunitoExtraBold',
      color: 'rgb(83,55,103)',
      marginLeft: 6,
    },
    educationLevel: {
      fontSize: 8,
      fontFamily: 'NunitoExtraBold',
      marginLeft: 30,
    },
    educationDescription: {
      fontSize: 8,
      fontFamily: 'NunitoRegular',
      marginLeft: 79,
      marginRight: 5,
    },
    inlineDateRange: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 8,
    },
    schoolRelatedTitle: {
      fontSize: 10,
      fontFamily: 'NunitoSemiBold',
      color: 'rgb(143,42,164)',
      marginTop: 7,
      marginLeft: 6,
    },
    schoolRelatedDetails: {
      fontSize: 8,
      fontFamily: 'NunitoRegular',
      marginLeft: 6,
    },
    workExperienceView: {
      marginLeft: 20,
      marginTop: 20,
      height: 470,
    },
    workYear: {
      fontSize: 8,
      fontFamily: 'NunitoExtraBold',
      color: 'rgb(83,55,103)',
      marginLeft: 6,
      width: 76,
    },
    workPosition: {
      fontSize: 8,
      fontFamily: 'NunitoExtraBold',
      marginLeft: 20,
      color: 'rgb(143,42,164)',
    },
    workCompany: {
      fontSize: 8,
      fontFamily: 'NunitoExtraBold',
      color: 'rgb(83,55,103)',
      marginLeft: 103,
      marginTop: 4,
      marginBottom: 4,
    },
    workDetails: {
      fontSize: 8,
      marginLeft: 103,
      marginRight: 5,
      fontFamily: 'NunitoRegular',
    },
    workMargin: {
      marginBottom: 10,
    },
    programmingSkillsView: {
      marginLeft: 20,
      marginTop: 20,
      height: 130,
    },
    programmingSkills: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    progSkills: {
      fontSize: 9,
      fontFamily: 'NunitoRegular',
    },
    progSkillsView: {
      marginTop: 6,
      marginBottom: 6,
      width: '33.33%',
    },
  });

  const Doc = () => (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={[styles.row, { height: 700 }]}>
          <View style={styles.left}>
            <Image
              style={styles.leftBackground}
              src={process.env.PUBLIC_URL + '/images/backgroundpdf.png'}
            ></Image>
            <Image
              style={styles.logo}
              src={process.env.PUBLIC_URL + '/images/thecodeboxlogo.png'}
            ></Image>
            <Text style={{ marginTop: 110, marginLeft: 75, fontSize: 7 }}>
              P R E S E N T S:
            </Text>
            <Image style={styles.image} src={imageUrl[0]}></Image>
            <Text style={styles.fullname}>{fullName.toUpperCase()}</Text>
            <Text style={styles.aboutMe}>ABOUT ME</Text>
            <Svg style={{ marginLeft: 30 }} height={'10px'}>
              <Line
                x1="0"
                y1="0"
                x2="200"
                y2="0"
                strokeWidth={1.5}
                stroke="rgb(160,32,240)"
              />
            </Svg>
            <Text style={styles.leftDescription}>{aboutMe}</Text>
            <Text style={styles.characterReference}>CHARACTER REFERENCE</Text>
            <Svg style={{ marginLeft: 30 }} height={'10px'}>
              <Line
                x1="0"
                y1="0"
                x2="200"
                y2="0"
                strokeWidth={1.5}
                stroke="rgb(160,32,240)"
              />
            </Svg>
            <View style={styles.characterReferenceView}>
              {characterReference.map(c => (
                <>
                  <Text style={styles.characterName}>{c.Name}</Text>
                  <Text style={styles.characterPosition}>{c.Position}</Text>
                  <Text style={styles.characterNumber}>T: {c.Number}</Text>
                </>
              ))}
            </View>
            <View style={styles.inline}>
              <Text style={styles.view}></Text>
              <Text style={styles.applicantInfo}>Phone</Text>
            </View>
            <Text style={styles.applicantInformationPhone}>09952888978</Text>
            <View style={styles.inline}>
              <Text style={styles.view}></Text>
              <Text style={styles.applicantInfo}>Email</Text>
            </View>
            <Text style={styles.applicantInformation}>info@thecodebox.net</Text>
            <View style={styles.inline}>
              <Text style={styles.view}></Text>
              <Text style={styles.applicantInfo}>Address</Text>
            </View>
            <Text style={styles.applicantInformation}>
              Unit 617B Meridian by Avenir, Golam Drive, Mabolo, Cebu City 6000
            </Text>
          </View>

          <View style={styles.right}>
            <View style={styles.educationView}>
              <Text style={styles.rightTitle}>{'</EDUCATION>'}</Text>
              <Svg style={{ marginLeft: 7 }} height={'1px'}>
                <Line
                  x1="0"
                  y1="0"
                  x2="350"
                  y2="0"
                  strokeWidth={2}
                  stroke="rgb(160,32,240)"
                />
              </Svg>
              {educationArr.map(c => (
                <>
                  <View style={styles.inlineDateRange}>
                    <Text style={styles.educationYear}>
                      {c.DateRange[0]?.getFullYear()}-
                      {c.DateRange[1]?.getFullYear()}
                    </Text>
                    <Text style={styles.educationLevel}>
                      {c.LevelTitle.toUpperCase()}
                    </Text>
                  </View>
                  {c.LevelDescription.map(x => (
                    <Text style={styles.educationDescription}>{x}</Text>
                  ))}
                </>
              ))}
              {schoolRelatedWorks.map(s => (
                <>
                  <Text
                    style={styles.schoolRelatedTitle}
                  >{`{${s.title}:/}`}</Text>
                  <Text style={styles.schoolRelatedDetails}>{s.details}</Text>
                </>
              ))}
            </View>
            <View style={styles.workExperienceView}>
              <Text style={styles.rightTitle}>{'</WORK EXPERIENCE>'}</Text>
              <Svg style={{ marginLeft: 7 }} height={'1px'}>
                <Line
                  x1="0"
                  y1="0"
                  x2="350"
                  y2="0"
                  strokeWidth={2}
                  stroke="rgb(160,32,240)"
                />
              </Svg>
              {workArr.map(w => (
                <View style={styles.workMargin}>
                  <View style={styles.inlineDateRange}>
                    <Text style={styles.workYear}>
                      {w.DateRange[0]?.toLocaleString('en-US', {
                        month: 'short',
                      })}{' '}
                      {w.DateRange[0]?.getFullYear()}-
                      {w.DateRange[1]?.toLocaleString('en-US', {
                        month: 'short',
                      })}{' '}
                      {w.DateRange[1]?.getFullYear()}
                    </Text>
                    <Text style={styles.workPosition}>
                      {w.Position.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.workCompany}>{w.Company}</Text>
                  {w.JobDetails.map(j => (
                    <Text style={styles.workDetails}>
                      {'\u2022' + ' '}
                      {j}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
            <View style={styles.programmingSkillsView}>
              <Text style={styles.rightTitle}>{'PROGRAMMING SKILLS'}</Text>
              <Svg style={{ marginLeft: 7 }} height={'1px'}>
                <Line
                  x1="0"
                  y1="0"
                  x2="350"
                  y2="0"
                  strokeWidth={2}
                  stroke="rgb(160,32,240)"
                />
              </Svg>
              <View style={styles.programmingSkills}>
                {programmingSkills.map(p => (
                  <View style={styles.progSkillsView}>
                    <Text style={styles.progSkills}>{p}</Text>
                    <Svg height={'1px'}>
                      <Line
                        opacity="0.5"
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        strokeWidth={4}
                        stroke="rgb(160,32,240)"
                      />
                    </Svg>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  console.log('characterReference', characterReference);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrl: any = [];
    images.forEach(image => newImageUrl.push(URL.createObjectURL(image)));
    setImageUrl(newImageUrl);
  }, [images]);

  const onImageChange = (e: any) => {
    setImage([...e.target.files]);
  };

  const educationDateStart = (val: any, index: number) => {
    const date = new Date(val);
    const res = [...educationArr];
    res[index].DateRange[0] = date;
    setEducationArr(res);
  };

  const educationDateEnd = (val: any, index: number) => {
    const date = new Date(val);
    const res = [...educationArr];
    res[index].DateRange[1] = date;
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

  const addWorkField = () => {
    const work: Work = {
      DateRange: [],
      Company: '',
      Position: '',
      JobDetails: [],
    };
    const current = [...workArr];
    current.push(work);
    setWorkArr(current);
  };

  const deleteWorkField = () => {
    const current = [...workArr];
    current.splice(current.length - 1, 1);
    setWorkArr(current);
  };

  const workDateStart = (val: any, index: number) => {
    const date = new Date(val);
    const res = [...workArr];
    res[index].DateRange[0] = date;
    setWorkArr(res);
  };

  const workDateEnd = (val: any, index: number) => {
    const date = new Date(val);
    const res = [...workArr];
    res[index].DateRange[1] = date;
    setWorkArr(res);
  };

  const handleWorkCompany = (e: any, index: number) => {
    const current = [...workArr];
    current[index].Company = e.target.value;
    setWorkArr(current);
  };

  const handleWorkPosition = (e: any, index: number) => {
    const current = [...workArr];
    current[index].Position = e.target.value;
    setWorkArr(current);
  };

  const addEducationLevelDescription = (index: number) => {
    const current = [...educationArr];
    current[index].LevelDescription.push('');
    setEducationArr(current);
  };

  const deleteJobDetails = (index: number) => {
    const current = [...workArr];
    current[index].JobDetails.splice(current[index].JobDetails.length - 1, 1);
    setWorkArr(current);
  };

  const addJobDetails = (index: number) => {
    const current = [...workArr];
    current[index].JobDetails.push('');
    setWorkArr(current);
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

  const addCharacterReferenceField = () => {
    const char: CharacterReference = {
      Name: '',
      Position: '',
      Number: '',
    };
    const current = [...characterReference];
    current.push(char);
    setCharacterReference(current);
  };

  const deleteCharacterReferenceField = () => {
    const current = [...characterReference];
    current.splice(current.length - 1, 1);
    setCharacterReference(current);
  };

  const handleEducationDetails = (e: any, index: number) => {
    const current = [...educationArr];
    current[index].Details = e.target.value;
    setEducationArr(current);
  };

  const handleLevelDescription = (e: any, index: number, idx: number) => {
    const current = [...educationArr];
    current[index].LevelDescription[idx] = e.target.value;
    setEducationArr(current);
  };

  const handleJobDetails = (e: any, index: number, idx: number) => {
    const current = [...workArr];
    current[index].JobDetails[idx] = e.target.value;
    setWorkArr(current);
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

  const handleCharacterReference = (e: any, index: number, type: string) => {
    const current = [...characterReference];
    if (type === 'number') {
      current[index].Number = parseInt(e);
      setCharacterReference(current);
    } else if (type === 'name') {
      current[index].Name = e;
      setCharacterReference(current);
    } else if (type === 'position') {
      current[index].Position = e;
      setCharacterReference(current);
    }
  };

  const handleSkills = (e: any) => {
    setProgrammingSkills(e);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmit(true);
  };

  const TopicDivider = () => (
    <div
      style={{
        color: 'purple',
        backgroundColor: 'purple',
        height: 5,
        marginBottom: 10,
        marginTop: 10,
      }}
    />
  );

  const ArrDivider = () => (
    <div
      style={{
        color: 'lightgreen',
        backgroundColor: 'lightgreen',
        height: 5,
        marginBottom: 10,
        marginTop: 10,
      }}
    />
  );

  console.log('edutionArr', programmingSkills);

  return (
    <Card>
      <Grid px={20} direction="column" container>
        <Grid item>
          <CardHeader title="PDF generator" />
        </Grid>
        <TopicDivider />
        <form onSubmit={handleSubmit}>
          <Grid container direction="column">
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              required
            />
            <img
              style={{ height: 150, width: 150, display: 'block' }}
              src={imageUrl[0]}
            />
          </Grid>
          <Typography>About me </Typography>
          <TextField
            value={aboutMe}
            onChange={c => setAboutMe(c.target.value)}
            label="Details"
            variant="filled"
            multiline={true}
            rows={5}
            fullWidth
            required
          ></TextField>
          <Grid item sx={{ py: 5 }}>
            <TextField
              onChange={e => setFullname(e.target.value)}
              value={fullName}
              label="Full Name"
              variant="filled"
              fullWidth
              required
            ></TextField>
          </Grid>
          <TopicDivider />
          <Grid item>
            <Typography> Character Reference</Typography>
            <Button
              variant="contained"
              onClick={() => {
                addCharacterReferenceField();
              }}
              disabled={characterReference.length === 3}
            >
              +
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                deleteCharacterReferenceField();
              }}
            >
              -
            </Button>
            {characterReference.map((c, index) => (
              <div style={{ paddingTop: 10 }}>
                <TextField
                  value={c.Name}
                  onChange={e =>
                    handleCharacterReference(e.target.value, index, 'name')
                  }
                  required
                  label="Name"
                  variant="filled"
                  sx={{ pr: 5, width: '20%' }}
                ></TextField>
                <TextField
                  value={c.Position}
                  onChange={e =>
                    handleCharacterReference(e.target.value, index, 'position')
                  }
                  label="Position"
                  sx={{ pr: 5, width: '20%' }}
                  variant="filled"
                  required
                ></TextField>
                <TextField
                  value={c.Number}
                  type={'number'}
                  sx={{ pr: 5, width: '20%' }}
                  onChange={e =>
                    handleCharacterReference(e.target.value, index, 'number')
                  }
                  label="Contact Number"
                  variant="filled"
                  required
                ></TextField>
                <ArrDivider />
              </div>
            ))}
          </Grid>
          <TopicDivider />
          <Grid item>
            <Typography>Education</Typography>
            <Button
              variant="contained"
              onClick={() => {
                addEducationField();
              }}
              disabled={educationArr.length === 2}
            >
              +
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                deleteEducationField();
              }}
            >
              -
            </Button>
            <div>
              {educationArr.map((c, index) => (
                <div style={{ paddingTop: 10 }}>
                  <div>
                    <DatePicker
                      key={`startDate${index}`}
                      label="Start Date"
                      views={['year']}
                      value={c.DateRange[0] || null}
                      onChange={newValue => {
                        educationDateStart(newValue, index);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                    <DatePicker
                      key={`endDate${index}`}
                      label="End Date"
                      views={['year']}
                      value={c.DateRange[1] || null}
                      onChange={newValue => {
                        educationDateEnd(newValue, index);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </div>
                  <TextField
                    value={c.LevelTitle}
                    onChange={e => handleEducationLevelTitle(e, index)}
                    label="Level title"
                    required
                  />
                  <Typography>Description</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      addEducationLevelDescription(index);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      deleteEducationLevelDescription(index);
                    }}
                  >
                    -
                  </Button>
                  {educationArr[index].LevelDescription.map((x, idx) => (
                    <div style={{ paddingTop: 10 }}>
                      <TextField
                        label="Details"
                        value={x}
                        required
                        fullWidth
                        onChange={e => handleLevelDescription(e, index, idx)}
                      />
                    </div>
                  ))}
                  <ArrDivider />
                </div>
              ))}
            </div>
          </Grid>
          <TopicDivider />
          <Grid item>
            <Typography>Other School Related Works</Typography>
            <Button
              variant="contained"
              onClick={() => {
                addSchoolRelatedWorks();
              }}
              disabled={schoolRelatedWorks.length === 2}
            >
              +
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                deleteSchoolRelatedWorks();
              }}
            >
              -
            </Button>
            {schoolRelatedWorks.map((x, index) => (
              <div style={{ paddingTop: 10 }}>
                <TextField
                  value={x.title}
                  onChange={e => handleSchoolRelated(e, index, 'title')}
                  key={`title${index}`}
                  label="title"
                  fullWidth
                  sx={{ pb: 2 }}
                  required
                ></TextField>
                <TextField
                  value={x.details}
                  onChange={e => handleSchoolRelated(e, index, 'detail')}
                  key={`details${index}`}
                  label="details"
                  fullWidth
                  required
                ></TextField>
                <ArrDivider />
              </div>
            ))}
          </Grid>
          <TopicDivider />
          <Grid item>
            <Typography>Work Experience</Typography>
            <Button
              variant="contained"
              onClick={() => {
                addWorkField();
              }}
              disabled={workArr.length === 4}
            >
              +
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                deleteWorkField();
              }}
            >
              -
            </Button>
            <div>
              {workArr.map((c, index) => (
                <div style={{ paddingTop: 10 }}>
                  <div>
                    <DatePicker
                      key={`startDate${index}`}
                      label="Start Date"
                      views={['month', 'year']}
                      value={c.DateRange[0] || null}
                      onChange={newValue => {
                        workDateStart(newValue, index);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                    <DatePicker
                      key={`endDate${index}`}
                      label="End Date"
                      views={['month', 'year']}
                      value={c.DateRange[1] || null}
                      onChange={newValue => {
                        workDateEnd(newValue, index);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </div>
                  <TextField
                    value={c.Company}
                    onChange={e => handleWorkCompany(e, index)}
                    label="Company"
                    required
                  />
                  <TextField
                    value={c.Position}
                    onChange={e => handleWorkPosition(e, index)}
                    label="Position"
                    required
                  />
                  <Typography>Job Details</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      addJobDetails(index);
                    }}
                    disabled={workArr[index].JobDetails.length === 5}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      deleteJobDetails(index);
                    }}
                  >
                    -
                  </Button>
                  {workArr[index].JobDetails.map((x, idx) => (
                    <div style={{ paddingTop: 10 }}>
                      <TextField
                        required
                        label="details"
                        value={x}
                        fullWidth
                        onChange={e => handleJobDetails(e, index, idx)}
                      />
                    </div>
                  ))}
                  <ArrDivider />
                </div>
              ))}
            </div>
            <TopicDivider />
            <Autocomplete
              multiple
              id="tags-filled"
              options={[]}
              value={programmingSkills}
              freeSolo={programmingSkills.length > 11 ? false : true}
              onChange={(e, value) => handleSkills(value)}
              renderTags={(value: string[], getTagProps: any) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Programming Skills"
                  placeholder="Skills"
                />
              )}
            />
          </Grid>
          {!submit && (
            <Button variant="contained" type="submit">
              GENERATE PDF
            </Button>
          )}
        </form>
        {submit && (
          <PDFDownloadLink
            key={'pdfLink'}
            document={<Doc />}
            fileName={fullName}
          >
            {({ loading }) =>
              loading ? (
                <Button variant="contained">Loading PDF</Button>
              ) : (
                <Button variant="contained">Download</Button>
              )
            }
          </PDFDownloadLink>
        )}
      </Grid>
    </Card>
  );
}

export default PDFGenerator;
