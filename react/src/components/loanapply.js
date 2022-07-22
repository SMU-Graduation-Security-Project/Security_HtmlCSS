import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/loanapply.module.css';
import React, { useEffect } from 'react';
import Axios from 'axios';



function Loanapply() {
    const navigate = useNavigate();
    const location = useLocation()
    const accountNumber = location.state[0].accountNumber
    const loanType = location.state[0].loanType
    const interestRate = location.state[0].interestRate

    // let loanType
    const [inputAmount, setInputAmount] = React.useState('');
    // const [info2, setInfo2] = React.useState([]);
    // const [interestRate, setInterestRate] = React.useState([]);


    // useEffect(() => {
    //     Axios.get('/users/loanlist')
    //         .then(res => {setInfo2(res.data.data)
    //             setInterestRate(res.data.data.interestRate)
    //         })
    //         // .then(res => console.log(res.data.data))
    //         .catch(err => console.log(err));
    // }, []);

    const handleInputAmount = (e) => {
        setInputAmount(e.target.value)
    }

    // const handleLoanType = (e) => {
    //     loanType = e.target.options[e.target.selectedIndex].text
    // };

    const onClickReset = () => {
        setInputAmount('')
    }

    const onClickTenMillion = () => {
        if (inputAmount === '')
            setInputAmount(10000000)
        else
            setInputAmount(parseInt(inputAmount) + 10000000)
    }

    const onClickMillion = () => {
        if (inputAmount === '')
            setInputAmount(1000000)
        else
            setInputAmount(parseInt(inputAmount) + 1000000)
    }

    const onClickFiveHundredThousand = () => {
        if (inputAmount === '')
            setInputAmount(500000)
        else
            setInputAmount(parseInt(inputAmount) + 500000)
    }

    const onClickLoan = () => {
        // console.log(setInfo2)
        // setAccountNum(accountNumber)
        // if (loanType === undefined || loanType === '대출종류를 선택해주세요')
        //     alert('대출종류를 선택해주세요')
        if (inputAmount.length === 0)
            alert('대출금액이 비어있습니다')
        else if (inputAmount > 100000000)
            alert('대출금액을 최대한도 이하로 작성해주세요')
        else {
            Axios.post('users/loan', {   
                    "accountNumber": accountNumber,
                    "amount": inputAmount,
                    "loanList": loanType,
                    "loginId": sessionStorage.getItem('loginId')
            }
            )
                .then(res => {

                    if (res.data.checker === true) {

                        navigate('/loancomplete',
                            {
                                state: [
                                    {
                                        accountNumber: accountNumber,
                                        inputAmount: inputAmount,
                                        loanType: loanType,
                                        loginId: sessionStorage.getItem('loginId'),
                                    }
                                ]
                            }
                        )
                    }
                    else
                        alert(res.data.message)
                })

                .catch()
        }
    }

    // const Tr2 = ({ info }) => {
    //     return (
    //         <Form.Select className={styles.loantypeinput} aria-label="Default select example" onChange={handleLoanType}>
    //             <option>대출종류를 선택해주세요</option>
    //             {
    //                 info.map((item, idx) => {
    //                     return (
    //                         <Td2 key={item.title} item={item} />
    //                     )
    //                 })
    //             }
    //         </Form.Select>
    //     );
    // };

    // const Td2 = ({ item }) => {
    //     return (
    //         <>
    //             <option value={item.title}>{item.title}</option>
    //         </>
    //     )
    // }

    // console.log(loanType)

    console.log(interestRate)

    return (
        <div className="Loanapply">
            <Container fluid>
                <Row className={styles.contentTop}>
                    <Col lg={3}></Col>
                    <Col lg={1}>
                        <h2 className={styles.loanapply}>대출신청</h2>
                        <h5 className={styles.loanproduct}>대출상품</h5>
                        <h5 className={styles.interestrate}>금리</h5>
                        <h5 className={styles.maximum}>최대한도</h5>
                        <h5 className={styles.loanamount}>대출금액</h5>
                    </Col>
                    <Col lg={5}>
                    {/* <Tr2 info={info2} /> */}
                        <h4 className={styles.interestrateguide}>{interestRate}</h4>

                        <h4 className={styles.maximumguide}>1억원</h4>

                        <InputGroup className={styles.transferamountinput}>
                            <FormControl onChange={handleInputAmount} value={inputAmount} />
                            <InputGroup.Text>원</InputGroup.Text>
                        </InputGroup>
                        <div className={styles.buttonlist}>
                            <Button className={styles.tenmillionbutton} variant="secondary" size="md" onClick={onClickTenMillion}> 1000만
                            </Button>

                            <Button className={styles.millionbutton} variant="secondary" size="md" onClick={onClickMillion}>
                                100만
                            </Button>

                            <Button className={styles.fivehundredthousandbutton} variant="secondary" size="md" onClick={onClickFiveHundredThousand}>
                                50만
                            </Button>

                            <Button className={styles.maximumbutton} variant="secondary" size="md">
                                최대한도
                            </Button>

                            <Button className={styles.correctionbutton} variant="secondary" size="md" onClick={onClickReset}>
                                정정
                            </Button>
                        </div>

                        <Button className={styles.applybutton} onClick={onClickLoan} variant="primary" size="lg" >
                            신청
                        </Button>
                    </Col>
                    <Col lg={3}></Col>


                </Row>
            </Container>
        </div>
    );
}

export default Loanapply;






















