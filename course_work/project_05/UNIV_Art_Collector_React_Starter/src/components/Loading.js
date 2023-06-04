import React from 'react';

/**
 * Create and export a component called Loading which uses this static HTML template:
 * 
 * <div id="loading">
 *   <h2 className="message">Searching...</h2>
 * </div>
 */

const Loading = ({isLoading}) => {
    if (isLoading)  
        {
         return <div id="loading">
                <h2 className='message'>Searching...</h2>
            </div>;
        }
    else return null
}

export default Loading;