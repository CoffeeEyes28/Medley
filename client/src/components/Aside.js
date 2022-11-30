import React from 'react'
import { useState, useEffect } from 'react';

import { search } from '../utils/API';

import { GET_All_USERS } from '../utils/queries';
import { SAVE_RECORD } from '../utils/mutations';

import Auth from '../utils/auth';

import { Divider } from '@mui/material';

import Searchbar from '../components/Searchbar';
import banner from "../Assets/Images/banner.jpg";




const SearchRecords = () => {
const [searchedRecords, setSearchedRecords] = useState([]);
const [searchInput, setSearchInput] = useState('');

const [savedRecordIds, setSavedRecordIds] = useState(getSavedRecordIds());

const [saveRecord] = useMutation(SAVE_RECORD);

useEffect(() => {

    return () => saveRecordIds(savedRecordIds);
});

const handleFormSubmit = async (event) => {
    event.preventDefault();

    if(!searchInput) {
        return
    }
}




}