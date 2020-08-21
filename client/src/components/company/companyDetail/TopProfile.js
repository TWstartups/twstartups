import React from 'react'
import { connect } from 'react-redux'
import ImageZone from '../imageZone'
import ProfileModal from '../modals/ProfileModal'
import { fetchComp } from '../../../actions'

class TopProfile extends React.Component {
  state = {
    showProfileModal: false
  }

  componentDidMount () {
    console.log('fetch in team')
    console.log(this.props)
    // this.props.fetchComp(this.props.match.params.id)
  }

  hideModal = () => {
    this.setState({
      showProfileModal: false
    })
  }

  renderProfileEditbtn = () => {
    if (this.props.checkOwnership) {
      return (
        <button
          onClick={() => this.setState({ showProfileModal: true })}
          className="circular ui icon button"
        >
          <i className="edit outline icon"></i>
        </button>
      )
    }
  }

  render () {
    const {
      companyEmail,
      companyNameEn,
      website,
      logo,
      _id
    } = this.props.company
    console.log('logo in company detail', logo)
    console.log('companyId', _id)
    return (
      <div className="top-profile-container">
        <div className="top-profile">
          <div className="" style={{ textAlign: 'center' }}>
            <ImageZone className="company-img" src={logo} editable={this.props.checkOwnership} query={{ companyId: _id, type: 'logo' }} dimension={{ width: '200px', height: '200px' }}/>
          </div>
          <div className="company-info">
            <div>
              {/* eslint-disable-next-line camelcase */}
              <h1 className="company-name">{companyNameEn}</h1>
              <div className="ui blue labels">
                <div className="ui label">Happy</div>
                <div className="ui label">Smart</div>
                <div className="ui label">Insane</div>
                <div className="ui label">Exciting</div>
              </div>
            </div>
            <div className="btn-group">
              <div
                className="ui teal button"
                onClick={() => window.open(`${website}`)}
              >
                Website
              </div>
              <a
                className="ui yellow button"
                // eslint-disable-next-line camelcase
                href={`mailto:${companyEmail}`}
              >
                Contact
              </a>
            </div>
            <div>{this.props.company && this.renderProfileEditbtn()}</div>
          </div>
        </div>
        {this.state.showProfileModal && (
          <ProfileModal hideModal={this.hideModal} />
        )}
      </div>
    )
  }
}
const mapStateToProps = ({ user, company }) => {
  return { user, company: company.currentCompany }
}

export default connect(mapStateToProps, { fetchComp })(TopProfile)
