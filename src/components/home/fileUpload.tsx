"use client";

import {useDropzone} from 'react-dropzone';
import { Button } from '../button';
import { FaRegFileAlt } from 'react-icons/fa';

export function FileUpload() {
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({
        accept: {
          'image/jpeg': [],
          'image/png': []
        }
      });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
    </li>
    ));
    
    
    return (
        <div className='mt-8'>
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})} className='flex justify-center items-center border-2 border-dashed border-gray-400 rounded-md w-120 h-80 cursor-pointer bg-gray-100 p-5'>
                <input {...getInputProps()} />
                {files.length > 0 ? (
                    <div>
                        <FaRegFileAlt className='text-5xl text-gray-500 mb-4' />
                       <p className='text-md font-medium text-gray-700'>{acceptedFiles[0].name}</p>
                    </div>
                )
                : (
                    <p className='text-lg font-semibold text-gray-600 text-center'>Drag and drop some files here, or click to select files</p>
                )
                }
            </div>
            <br />
            {files.length > 0 && (
            <aside className="mt-4">
            <h4 className="font-medium mb-1">Arquivo selecionado:</h4>
            <ul className="text-sm text-gray-700">{files}</ul>
            <br />
            <Button text='Transcrever' function={() => alert("hi")} />
            </aside>
            )}
        </section>
        </div>
    );
}