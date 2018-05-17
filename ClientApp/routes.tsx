import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import Module from './components/module';

import Videos from './components/Videos';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/module' component={ Module } />
    <Route path='/counter' component={ Counter as any } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData as any  } />
    <Route path='/videos' component={ Videos as any } />
</Layout>;
