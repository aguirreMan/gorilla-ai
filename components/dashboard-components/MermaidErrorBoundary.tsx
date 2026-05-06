import React from 'react'
import { ErrorInfo, ReactNode } from 'react'
import ChatSkeleton from '@/components/dashboard-components/ChatSkeleton'

interface MermaidErrorBoundaryProps {
  children: ReactNode
  resetKey?: string
}

interface StateError {
  hasError: boolean
}


export default class MermaidErrorBoundary extends React.Component<MermaidErrorBoundaryProps, StateError> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Mermaid error:', errorMessage)
    console.error(errorInfo.componentStack)
  }

  componentDidUpdate(prevProps: Readonly<MermaidErrorBoundaryProps>): void {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
        this.setState({hasError: false})
      }
  }

  render() {
    if (this.state.hasError) {
      return <ChatSkeleton />
    }

    return this.props.children
  }
}
