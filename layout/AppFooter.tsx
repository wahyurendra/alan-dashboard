/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const currentYear = new Date().getFullYear();
    return (
        <div className="layout-footer">
            <span className="font-medium ml-2">ALAN</span>
            <span className="font-medium ml-2">© {currentYear}. All rights reserved.</span>
        </div>
    );
};

export default AppFooter;
