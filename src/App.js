import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { notification } from "antd";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Staff_Party_Master_Get, Staff_Party_Master_Delete, Staff_Party_Master_Update, Staff_Date_Update } from './store/action/staff_action';
import Search from '../src/asset/img/Search.png';
import Massage from '../src/asset/img/massage.png';
import deleteimg from '../src/asset/img/delete.png';

const Attendees = styled.div`
  display: block;
  max-width: 90%;
  margin: auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 10px;
`;
const TitileWappper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    border-bottom: 1px solid #d7d7d7;
`;
const AttendeesTitile = styled.h2`
  display:block;
  color: #489f9b;
  margin: 0;
`;
const AttendeesSearch = styled.div`
  display:flex;
`;
const SearchBox = styled.input`
  display: block;
  border: 1px solid #ccc;
  padding: 9px 28px 9px 15px;
  border-radius: 50px;
  margin-right: 11px;
  :focus{
    outline: none;
  }
  :placeholder{
    color:#6b6c6b;
  }
`;
const InviteButton = styled.button`
  display: block;
  color: #fff;
  background: #ecac40;
  border: none;
  padding: 0px 20px;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
`;
const AttendeesItem = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid #d7d7d7;
margin: 0px 40px;
padding: 20px 0px;
`;
const Contentname = styled.div`
display: block;
color: #6b6c6b;
font-size: 18px;
`;
const TimeSet = styled.span`
color: #fff;
background: #64b6d2;
display: inline-block;
padding: 1px 9px 2px 9px;
border-radius: 50px;
font-weight: 100;
`;
const SessionStart = styled.div`
display: flex;
align-items: center;
`;
const SessionText = styled.p`
display: block;
margin: 0;
color: #49a09c;
font-size: 18px;
`;
const SearchBoxMain = styled.div`
  display: block;
  position: relative;
`;
const SearchImg = styled.img`
display: block;
position: absolute;
top: 50%;
right: 25px;
transform: translateY(-50%);
width: 17px;
`;
const SessionStartImg = styled.img`
  display: block;
  width: 20px;
  margin: 0px 20px;
`;
const Sessiondeleteimg = styled.img`
  display: block;
  width: 16px;
`;

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  padding: 10,
};

const App = (props) => {
  const [inviteUser, setInviteUser] = useState('');
  const [startSession, setStartSession] = useState(false);

  useEffect(() => {
    props.Staff_Party_Master_Get();
  }, []);

  const handleDelete = (data) => {
    props.Staff_Party_Master_Delete(data);
    notification.success({ message: "Delete successful" })
    setTimeout(function () { props.Staff_Party_Master_Get(); }, 3000);
  }

  const handleInvite = () => {
    if (inviteUser && inviteUser) {
      props.Staff_Party_Master_Update(inviteUser);
      setTimeout(function () { props.Staff_Party_Master_Get(); setInviteUser('') }, 3000);
    } else {
      notification.error({ message: "Please Enter User Email" })
    }
  }

  const handleChanges = (e) => {
    setInviteUser(e.target.value);
  }

  const timeDiffCalc = (dateFuture, dateNow, id) => {

    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

    return addDuration(difference, id);
  }

  const addDuration = (data, id) => {
    let dureTime = { duration: data };
    props.Staff_Date_Update(id, dureTime);
    setTimeout(function () { props.Staff_Party_Master_Get(); }, 3000);
  }

  const handleStartTime = (id, data) => {
    let dataTime;
    setStartSession(!startSession);
    var current = new Date();
    timeDiffCalc(new Date(data.startAt), new Date(current.toLocaleString()));
    if (data.startAt === null) {
      dataTime = { startAt: current.toLocaleString(), status: "1" };
      props.Staff_Date_Update(id, dataTime);
      notification.success({ message: "Add Start Time successful" })
      setTimeout(function () { props.Staff_Party_Master_Get(); }, 3000);
    } else {
      dataTime = { endAt: current.toLocaleString(), status: "0" };
      props.Staff_Date_Update(id, dataTime);
      notification.success({ message: "Add End Time successful" })
      setTimeout(function () { props.Staff_Party_Master_Get(); }, 3000);
      timeDiffCalc(new Date(data.startAt), new Date(current.toLocaleString()), id);
    }
  }
  let result;
  let DataMain = () => {
    result = props.stafflist && props.stafflist.filter((word => word.invite === true))
  }

  return (
    <div style={styles}>
      {DataMain()}
      <Attendees>
        <TitileWappper>
          <AttendeesTitile>{result.length} Attendees in waiting Room</AttendeesTitile>
          <AttendeesSearch>
            <SearchBoxMain>
              <SearchBox type='text' placeholder="Start typing...." onChange={(e) => handleChanges(e)} />
              <SearchImg src={Search} />
            </SearchBoxMain>
            <InviteButton onClick={() => handleInvite()}>INVITE STAFF</InviteButton>
          </AttendeesSearch>
        </TitileWappper>
        {result && result.map((data) => <AttendeesItem>
          <Contentname>{data.name} {data.duration && <TimeSet>{data.duration}</TimeSet>} </Contentname>
          <SessionStart>
            {data.status === '1' ? <SessionText onClick={() => handleStartTime(data.id, data)}>"STOP SESSION"</SessionText> : data.status === '0' ? "" : <SessionText onClick={() => handleStartTime(data.id, data)}>"START SESSION"</SessionText>}
            <SessionStartImg src={Massage} />
            <Sessiondeleteimg src={deleteimg} onClick={() => handleDelete(data.id)} />
          </SessionStart>
        </AttendeesItem>)}
      </Attendees>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    stafflist: state.STAFF.stafflist,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Staff_Party_Master_Get: (data) => dispatch(Staff_Party_Master_Get(data)),
    Staff_Party_Master_Delete: (data) => dispatch(Staff_Party_Master_Delete(data)),
    Staff_Party_Master_Update: (data) => dispatch(Staff_Party_Master_Update(data)),
    Staff_Date_Update: (id, data) => dispatch(Staff_Date_Update(id, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
