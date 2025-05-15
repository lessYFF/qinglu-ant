import React from 'react'


declare global {
  const useState: typeof React.useState
  const useEffect: typeof React.useEffect
  const useCallback: typeof React.useCallback
  const useMemo: typeof React.useMemo
  const useRef: typeof React.useRef
  const useImperativeHandle: typeof React.useImperativeHandle

  interface Window {
    useState: typeof React.useState,
    useEffect: typeof React.useEffect,
    useCallback: typeof React.useCallback,
    useMemo: typeof React.useMemo,
    useRef: typeof React.useRef,
    useImperativeHandle: typeof React.useImperativeHandle,
  }
}



window.useState = React.useState
window.useEffect = React.useEffect
window.useCallback = React.useCallback
window.useMemo = React.useMemo
window.useRef = React.useRef
window.useImperativeHandle = React.useImperativeHandle
